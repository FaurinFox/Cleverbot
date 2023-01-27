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

const vars = {
    csStr: "&cs={cs}",
    apiKey: "{apikey}",
    input: "{input}",
    wrapper: "{wrapper}",
    wrapperStr: "@FaurinFox/cleverbot",
    baseURL: "TBD",
    createdURL: "TBD",
    change: function(key, value) {
        if (vars[key] !== undefined) {
            vars[key] = value;
        }else{
            throw this.errors.keyNotFound;
        }
    },
    errors: {
        401: new Error('Cleverbot: Unauthorized | Invalid key.'),
        404: new Error('Cleverbot: Not Found.'),
        413: new Error('Cleverbot: Request too large. Limit: 64Kb'),
        414: new Error('Cleverbot: Request URI too large.'),
        502: new Error('Cleverbot: Unable to get a reply from server.'),
        504: new Error('Cleverbot: Unable to get a reply from server.'),
        503: new Error('Cleverbot: Client sent too many requests.'),
        "ETIMEDOUT": new Error('Cleverbot: Request timed out, try again later'),
        "optionsNotObj": new Error('Cleverbot: Options argument provided, but it is not an object.'),
        "optionsObjMissingKey": new Error("Cleverbot: Options object provided, but it is missing 'cs' key."),
        "optionsObjKeyNotString": new Error("'Cleverbot: Options object provided, but the 'cs' key is not a string."),
        "keyNotFound": new Error("'Change' function: Provided key not found."),
        "Unknown": new Error('Cleverbot: Unknown Error.')
    }
}

vars.change("baseURL", "https://www.cleverbot.com/getreply?key="+vars.apiKey+"&input="+vars.input+"&wrapper="+vars.wrapper);

export default vars;