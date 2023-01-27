/*
 *
 *    @FaurinFox/Cleverbot, Provides a wrapper/client for the Cleverbot API
 *
 *    Copyright (©) 2023 Faurin Fox (Faurin Littlepaws)
 *
 *    This program is free software: you can redistribute it and/or modify
 *    it under the terms of the GNU General Public License as published by
 *    the Free Software Foundation, either version 3 of the License, or
 *    (at your option) any later version.
 *
 *    This program is distributed in the hope that it will be useful,
 *    but WITHOUT ANY WARRANTY; without even the implied warranty of
 *    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 *    GNU General Public License for more details.
 *
 *    You should have received a copy of the GNU General Public License
 *    along with this program.  If not, see <https://www.gnu.org/licenses/>.
 *
 *    This file incorporates work covered by the following copyright and  
 *    permission notice:  
 *
 *		Copyright (c) 2017 David Tesler
 *
 *		Permission is hereby granted, free of charge, to any person obtaining a copy
 *		of this software and associated documentation files (the "Software"), to deal
 *		in the Software without restriction, including without limitation the rights
 *		to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 *		copies of the Software, and to permit persons to whom the Software is
 *		furnished to do so, subject to the following conditions:
 *
 *		The above copyright notice and this permission notice shall be included in all
 *		copies or substantial portions of the Software.
 *
 *		THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 *		IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 *		FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 *		AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 *		LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 *		OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 *		SOFTWARE.
 * 
 */

'use strict';

import fetch from 'node-fetch';
import vars from './vars.mjs'

const BASE_URL = vars.baseURL;
const CS = vars.csStr;

function inquiry(settings) {
	return function query(input, options, callback) {
		return new Promise(async function (resolve, reject) {
			let requestURL = BASE_URL
				.replace(vars.apiKey, settings.key)
				.replace(vars.input, encodeURIComponent(input))
				.replace(vars.wrapper, encodeURIComponent(vars.wrapperStr));
			if (options) {
				if (typeof options == "object") {
					if (options.cs) {
						if (typeof options.cs == "string") {
							requestURL += CS.replace('{cs}', options.cs);
						} else {
							return callback ? callback(vars.errors.optionsObjKeyNotString) : reject(vars.errors.optionsObjKeyNotString);
						}
					} else {
						return callback ? callback(vars.errors.optionsObjMissingKey) : reject(vars.errors.optionsObjMissingKey);
					}
				} else {
					return callback ? callback(vars.errors.optionsNotObj) : reject(vars.errors.optionsNotObj);
				}
			}
			try {
				vars.change('createdURL', requestURL);
				const res = await fetch(vars.createdURL);
				if (res.status >= 200 && res.status < 300) {
					const data = await res.json();
					data.URL = vars.createdURL;
					return callback ? callback(data) : resolve(data);
				} else {
					return callback ? callback(vars.errors[res.status] || vars.errors.Unknown) : reject(vars.errors[res.status] || vars.errors.Unknown);
				}
			} catch (error) {
				if (error.code) {
					if (vars.errors[error.code]) {
						return callback ? callback(vars.errors[error.code]) : reject(vars.errors[error.code]);
					}
				}
				return callback ? callback(error) : reject(error);
			}
		});
	};
}

export default inquiry;
