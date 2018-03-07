(function(){
    var print;
    var promiseArray = [];
    var config = require("../config/config.js");
    var fs = require("fs");
    
    exports.print = print = function(options){
        if (options && options.path && typeof options.path === 'string') {
            
            // Validate file path and its existence
            if(fs.existsSync(options.path)){
                if(!(fs.lstatSync(options.path)).isFile()){
                    throw new Error("Specified path does not corresponds to a valid file");
                }
            }else{
                throw new Error("Invalid file path --> " + options.path);
                return false;
            }
            
            // Read File
            var lineReader = require('readline').createInterface({
                input: require('fs').createReadStream(options.path)
            });
            
            // Perform action after reading each line
            lineReader.on("line", function(line){

                // Create an array of promises
                promiseArray.push(new Promise(function(resolve, reject){
                    try{
                        var json = JSON.parse(line);
                        if(json.latitude && json.user_id && json.name && json.longitude){
                            if(isWithinRange(parseFloat(json.latitude), parseFloat(json.longitude))){
                                resolve(json);
                            }else{
                                resolve(null);
                            }
                        }else{
                            resolve(null);
                        }
                    }catch(err){
                        resolve(null);
                    }
                }));
            });

            // Perform action on read completion
            lineReader.on("close", function(){
                
               // Check whether any promise is created or not
               if(promiseArray.length > 0){

                   // Excute all promises in an async manner
                   Promise.all(promiseArray).then(function(passed){

                       // Remove null objects and sort based on user id and print to console
                       var sortedArray = passed.filter(function(item){
                            return (null != item);
                        }).sort(function(left, right){
                            return left.user_id - right.user_id;
                        }).map(function(item){
                            console.log("User ID is  " + item.user_id + " and Name is " + item.name);
                        });
                   });
                     
               }else{
                   console.log("No data in the file.")
               } 
            });

        } else {
            throw new Error("Invalid file path");
        }


        /**
         * Method to calculate distance between two coordinates and 
         * return whether it is within given range or not
         * 
         * Algo Reference:- https://www.movable-type.co.uk/scripts/latlong.html
         * @param {*} range 
         * @param {*} destLat 
         * @param {*} destLon 
         */
        var isWithinRange = function(destLat, destLon, resolve){
            
            var sourceLat = config.officeLat,
            sourceLong = config.officeLon,
            range = config.range;
            
            var R = 6371e3; // metres
            var φ1 = convertToRadians(sourceLat);
            
            var φ2 = convertToRadians(destLat);
            var Δφ = convertToRadians(destLat-sourceLat);
            var Δλ = convertToRadians(destLon-sourceLong);
            
            var a = Math.sin(Δφ/2) * Math.sin(Δφ/2) +
                    Math.cos(φ1) * Math.cos(φ2) *
                    Math.sin(Δλ/2) * Math.sin(Δλ/2);
                   
            var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
            
            return (range >= (R * c));
        }

        /**
         * Convert degrees to radians
         * @param {*} degrees 
         */
        var convertToRadians = function(degrees){
            return degrees * Math.PI / 180;
        };
    }
}).call(this);