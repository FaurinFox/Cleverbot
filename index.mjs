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
 */

import inquiry from './lib/query.mjs';
import vars from './lib/vars.mjs'

function validateTweaks(tweakNumber, optionName, optionValue) {
	if (typeof optionValue == "number") {
		if (Number.isInteger(optionValue)) {
			if (optionValue >= 0 && optionValue <= 100) {
				vars.change('tweak'+tweakNumber, optionValue);
			} else {
				return vars.errors.handler('optionsObjKeyInvalidValueRange', {key: optionName, val: optionValue, range: '0-100'});
			}
		} else {
			return vars.errors.handler('optionsObjKeyNotInteger', optionName);
		}
	} else {
		return vars.errors.handler('optionsObjKeyNotNumber', optionName);
	}
}

class Cleverbot {
    query;
    constructor(args) {
        this.query = inquiry(args);
    }
    setTweak(tweakName, value) {
        if (typeof tweakName == 'string') {
            switch (tweakName.toLowerCase()) {
                case "wackiness":
                    validateTweaks(1, 'wackiness', value);
                    break;
                case "talkativeness":
                    validateTweaks(2, 'talkativeness', value);
                    break;
                case "attentiveness":
                    validateTweaks(3, 'attentiveness', value);
                    break;
                default:
                    return vars.errors.handler('invalidTweak', tweakName);
            }
        }else{
            return vars.errors.handler('optionsObjKeyNotString', 'tweakName');
        }
    }
    setWackiness(value) {
        validateTweaks(1, 'wackiness', value);
    }
    setTalkativeness(value) {
        validateTweaks(2, 'talkativeness', value);
    }
    setAttentiveness(value) {
        validateTweaks(3, 'attentiveness', value);
    }
    getTweak(tweakName, callback) {
        return new Promise(async function (resolve, reject) {
            if (typeof tweakName == 'string') {
                switch (tweakName.toLowerCase()) {
                    case "wackiness":
                        return callback ? callback(vars.tweak1) : resolve(vars.tweak1);
                    case "talkativeness":
                        return callback ? callback(vars.tweak2) : resolve(vars.tweak2);
                    case "attentiveness":
                        return callback ? callback(vars.tweak3) : resolve(vars.tweak3);
                    default:
                        return callback ? callback(vars.errors.handler('invalidTweak', value)) : reject(vars.errors.handler('invalidTweak', value));
                }
            }else{
                return  callback ? callback(vars.errors.handler('optionsObjKeyNotString', 'tweakName')) : reject(vars.errors.handler('optionsObjKeyNotString', 'tweakName'));
            }
        });
    }
    getTweaks(callback) {
        return new Promise(async function (resolve, reject) {
            let tempObj = {};
            try {
                tempObj = {
                    'wackiness': vars.tweak1,
                    'talkativeness': vars.tweak2,
                    'attentiveness': vars.tweak3
                }
                return callback ? callback(tempObj) : resolve(tempObj)
            } catch (error) {
                return callback ? callback(error) : reject(error);
            } finally {
                tempObj = {};
            }
        });
    }
}

export default Cleverbot;