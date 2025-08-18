/*eslint-disable block-scoped-var, id-length, no-control-regex, no-magic-numbers, no-prototype-builtins, no-redeclare, no-shadow, no-var, sort-vars*/
(function(global, factory) { /* global define, require, module */

    /* AMD */ if (typeof define === 'function' && define.amd)
        define(["protobufjs/minimal"], factory);

    /* CommonJS */ else if (typeof require === 'function' && typeof module === 'object' && module && module.exports)
        module.exports = factory(require("protobufjs/minimal"));

})(this, function($protobuf) {
    "use strict";

    // Common aliases
    var $Reader = $protobuf.Reader, $Writer = $protobuf.Writer, $util = $protobuf.util;
    
    // Exported root namespace
    var $root = $protobuf.roots["default"] || ($protobuf.roots["default"] = {});
    
    $root.database = (function() {
    
        /**
         * Namespace database.
         * @exports database
         * @namespace
         */
        var database = {};
    
        database.User = (function() {
    
            /**
             * Properties of a User.
             * @memberof database
             * @interface IUser
             * @property {string|null} [email] User email
             * @property {string|null} [passwordHash] User passwordHash
             * @property {boolean|null} [banned] User banned
             * @property {string|null} [name] User name
             * @property {number|null} [age] User age
             * @property {number|Long|null} [createdAt] User createdAt
             * @property {number|Long|null} [updatedAt] User updatedAt
             */
    
            /**
             * Constructs a new User.
             * @memberof database
             * @classdesc Represents a User.
             * @implements IUser
             * @constructor
             * @param {database.IUser=} [properties] Properties to set
             */
            function User(properties) {
                if (properties)
                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }
    
            /**
             * User email.
             * @member {string} email
             * @memberof database.User
             * @instance
             */
            User.prototype.email = "";
    
            /**
             * User passwordHash.
             * @member {string} passwordHash
             * @memberof database.User
             * @instance
             */
            User.prototype.passwordHash = "";
    
            /**
             * User banned.
             * @member {boolean} banned
             * @memberof database.User
             * @instance
             */
            User.prototype.banned = false;
    
            /**
             * User name.
             * @member {string} name
             * @memberof database.User
             * @instance
             */
            User.prototype.name = "";
    
            /**
             * User age.
             * @member {number} age
             * @memberof database.User
             * @instance
             */
            User.prototype.age = 0;
    
            /**
             * User createdAt.
             * @member {number|Long} createdAt
             * @memberof database.User
             * @instance
             */
            User.prototype.createdAt = $util.Long ? $util.Long.fromBits(0,0,false) : 0;
    
            /**
             * User updatedAt.
             * @member {number|Long} updatedAt
             * @memberof database.User
             * @instance
             */
            User.prototype.updatedAt = $util.Long ? $util.Long.fromBits(0,0,false) : 0;
    
            /**
             * Creates a new User instance using the specified properties.
             * @function create
             * @memberof database.User
             * @static
             * @param {database.IUser=} [properties] Properties to set
             * @returns {database.User} User instance
             */
            User.create = function create(properties) {
                return new User(properties);
            };
    
            /**
             * Encodes the specified User message. Does not implicitly {@link database.User.verify|verify} messages.
             * @function encode
             * @memberof database.User
             * @static
             * @param {database.IUser} message User message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            User.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                if (message.email != null && Object.hasOwnProperty.call(message, "email"))
                    writer.uint32(/* id 1, wireType 2 =*/10).string(message.email);
                if (message.passwordHash != null && Object.hasOwnProperty.call(message, "passwordHash"))
                    writer.uint32(/* id 2, wireType 2 =*/18).string(message.passwordHash);
                if (message.banned != null && Object.hasOwnProperty.call(message, "banned"))
                    writer.uint32(/* id 3, wireType 0 =*/24).bool(message.banned);
                if (message.name != null && Object.hasOwnProperty.call(message, "name"))
                    writer.uint32(/* id 4, wireType 2 =*/34).string(message.name);
                if (message.age != null && Object.hasOwnProperty.call(message, "age"))
                    writer.uint32(/* id 5, wireType 0 =*/40).int32(message.age);
                if (message.createdAt != null && Object.hasOwnProperty.call(message, "createdAt"))
                    writer.uint32(/* id 6, wireType 0 =*/48).int64(message.createdAt);
                if (message.updatedAt != null && Object.hasOwnProperty.call(message, "updatedAt"))
                    writer.uint32(/* id 7, wireType 0 =*/56).int64(message.updatedAt);
                return writer;
            };
    
            /**
             * Encodes the specified User message, length delimited. Does not implicitly {@link database.User.verify|verify} messages.
             * @function encodeDelimited
             * @memberof database.User
             * @static
             * @param {database.IUser} message User message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            User.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };
    
            /**
             * Decodes a User message from the specified reader or buffer.
             * @function decode
             * @memberof database.User
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {database.User} User
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            User.decode = function decode(reader, length) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                var end = length === undefined ? reader.len : reader.pos + length, message = new $root.database.User();
                while (reader.pos < end) {
                    var tag = reader.uint32();
                    switch (tag >>> 3) {
                    case 1:
                        message.email = reader.string();
                        break;
                    case 2:
                        message.passwordHash = reader.string();
                        break;
                    case 3:
                        message.banned = reader.bool();
                        break;
                    case 4:
                        message.name = reader.string();
                        break;
                    case 5:
                        message.age = reader.int32();
                        break;
                    case 6:
                        message.createdAt = reader.int64();
                        break;
                    case 7:
                        message.updatedAt = reader.int64();
                        break;
                    default:
                        reader.skipType(tag & 7);
                        break;
                    }
                }
                return message;
            };
    
            /**
             * Decodes a User message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof database.User
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {database.User} User
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            User.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };
    
            /**
             * Verifies a User message.
             * @function verify
             * @memberof database.User
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            User.verify = function verify(message) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                if (message.email != null && message.hasOwnProperty("email"))
                    if (!$util.isString(message.email))
                        return "email: string expected";
                if (message.passwordHash != null && message.hasOwnProperty("passwordHash"))
                    if (!$util.isString(message.passwordHash))
                        return "passwordHash: string expected";
                if (message.banned != null && message.hasOwnProperty("banned"))
                    if (typeof message.banned !== "boolean")
                        return "banned: boolean expected";
                if (message.name != null && message.hasOwnProperty("name"))
                    if (!$util.isString(message.name))
                        return "name: string expected";
                if (message.age != null && message.hasOwnProperty("age"))
                    if (!$util.isInteger(message.age))
                        return "age: integer expected";
                if (message.createdAt != null && message.hasOwnProperty("createdAt"))
                    if (!$util.isInteger(message.createdAt) && !(message.createdAt && $util.isInteger(message.createdAt.low) && $util.isInteger(message.createdAt.high)))
                        return "createdAt: integer|Long expected";
                if (message.updatedAt != null && message.hasOwnProperty("updatedAt"))
                    if (!$util.isInteger(message.updatedAt) && !(message.updatedAt && $util.isInteger(message.updatedAt.low) && $util.isInteger(message.updatedAt.high)))
                        return "updatedAt: integer|Long expected";
                return null;
            };
    
            /**
             * Creates a User message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof database.User
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {database.User} User
             */
            User.fromObject = function fromObject(object) {
                if (object instanceof $root.database.User)
                    return object;
                var message = new $root.database.User();
                if (object.email != null)
                    message.email = String(object.email);
                if (object.passwordHash != null)
                    message.passwordHash = String(object.passwordHash);
                if (object.banned != null)
                    message.banned = Boolean(object.banned);
                if (object.name != null)
                    message.name = String(object.name);
                if (object.age != null)
                    message.age = object.age | 0;
                if (object.createdAt != null)
                    if ($util.Long)
                        (message.createdAt = $util.Long.fromValue(object.createdAt)).unsigned = false;
                    else if (typeof object.createdAt === "string")
                        message.createdAt = parseInt(object.createdAt, 10);
                    else if (typeof object.createdAt === "number")
                        message.createdAt = object.createdAt;
                    else if (typeof object.createdAt === "object")
                        message.createdAt = new $util.LongBits(object.createdAt.low >>> 0, object.createdAt.high >>> 0).toNumber();
                if (object.updatedAt != null)
                    if ($util.Long)
                        (message.updatedAt = $util.Long.fromValue(object.updatedAt)).unsigned = false;
                    else if (typeof object.updatedAt === "string")
                        message.updatedAt = parseInt(object.updatedAt, 10);
                    else if (typeof object.updatedAt === "number")
                        message.updatedAt = object.updatedAt;
                    else if (typeof object.updatedAt === "object")
                        message.updatedAt = new $util.LongBits(object.updatedAt.low >>> 0, object.updatedAt.high >>> 0).toNumber();
                return message;
            };
    
            /**
             * Creates a plain object from a User message. Also converts values to other types if specified.
             * @function toObject
             * @memberof database.User
             * @static
             * @param {database.User} message User
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            User.toObject = function toObject(message, options) {
                if (!options)
                    options = {};
                var object = {};
                if (options.defaults) {
                    object.email = "";
                    object.passwordHash = "";
                    object.banned = false;
                    object.name = "";
                    object.age = 0;
                    if ($util.Long) {
                        var long = new $util.Long(0, 0, false);
                        object.createdAt = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
                    } else
                        object.createdAt = options.longs === String ? "0" : 0;
                    if ($util.Long) {
                        var long = new $util.Long(0, 0, false);
                        object.updatedAt = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
                    } else
                        object.updatedAt = options.longs === String ? "0" : 0;
                }
                if (message.email != null && message.hasOwnProperty("email"))
                    object.email = message.email;
                if (message.passwordHash != null && message.hasOwnProperty("passwordHash"))
                    object.passwordHash = message.passwordHash;
                if (message.banned != null && message.hasOwnProperty("banned"))
                    object.banned = message.banned;
                if (message.name != null && message.hasOwnProperty("name"))
                    object.name = message.name;
                if (message.age != null && message.hasOwnProperty("age"))
                    object.age = message.age;
                if (message.createdAt != null && message.hasOwnProperty("createdAt"))
                    if (typeof message.createdAt === "number")
                        object.createdAt = options.longs === String ? String(message.createdAt) : message.createdAt;
                    else
                        object.createdAt = options.longs === String ? $util.Long.prototype.toString.call(message.createdAt) : options.longs === Number ? new $util.LongBits(message.createdAt.low >>> 0, message.createdAt.high >>> 0).toNumber() : message.createdAt;
                if (message.updatedAt != null && message.hasOwnProperty("updatedAt"))
                    if (typeof message.updatedAt === "number")
                        object.updatedAt = options.longs === String ? String(message.updatedAt) : message.updatedAt;
                    else
                        object.updatedAt = options.longs === String ? $util.Long.prototype.toString.call(message.updatedAt) : options.longs === Number ? new $util.LongBits(message.updatedAt.low >>> 0, message.updatedAt.high >>> 0).toNumber() : message.updatedAt;
                return object;
            };
    
            /**
             * Converts this User to JSON.
             * @function toJSON
             * @memberof database.User
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            User.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };
    
            return User;
        })();
    
        database.Collection = (function() {
    
            /**
             * Properties of a Collection.
             * @memberof database
             * @interface ICollection
             * @property {Object.<string,database.IUser>|null} [users] Collection users
             */
    
            /**
             * Constructs a new Collection.
             * @memberof database
             * @classdesc Represents a Collection.
             * @implements ICollection
             * @constructor
             * @param {database.ICollection=} [properties] Properties to set
             */
            function Collection(properties) {
                this.users = {};
                if (properties)
                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }
    
            /**
             * Collection users.
             * @member {Object.<string,database.IUser>} users
             * @memberof database.Collection
             * @instance
             */
            Collection.prototype.users = $util.emptyObject;
    
            /**
             * Creates a new Collection instance using the specified properties.
             * @function create
             * @memberof database.Collection
             * @static
             * @param {database.ICollection=} [properties] Properties to set
             * @returns {database.Collection} Collection instance
             */
            Collection.create = function create(properties) {
                return new Collection(properties);
            };
    
            /**
             * Encodes the specified Collection message. Does not implicitly {@link database.Collection.verify|verify} messages.
             * @function encode
             * @memberof database.Collection
             * @static
             * @param {database.ICollection} message Collection message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            Collection.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                if (message.users != null && Object.hasOwnProperty.call(message, "users"))
                    for (var keys = Object.keys(message.users), i = 0; i < keys.length; ++i) {
                        writer.uint32(/* id 1, wireType 2 =*/10).fork().uint32(/* id 1, wireType 2 =*/10).string(keys[i]);
                        $root.database.User.encode(message.users[keys[i]], writer.uint32(/* id 2, wireType 2 =*/18).fork()).ldelim().ldelim();
                    }
                return writer;
            };
    
            /**
             * Encodes the specified Collection message, length delimited. Does not implicitly {@link database.Collection.verify|verify} messages.
             * @function encodeDelimited
             * @memberof database.Collection
             * @static
             * @param {database.ICollection} message Collection message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            Collection.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };
    
            /**
             * Decodes a Collection message from the specified reader or buffer.
             * @function decode
             * @memberof database.Collection
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {database.Collection} Collection
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            Collection.decode = function decode(reader, length) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                var end = length === undefined ? reader.len : reader.pos + length, message = new $root.database.Collection(), key, value;
                while (reader.pos < end) {
                    var tag = reader.uint32();
                    switch (tag >>> 3) {
                    case 1:
                        if (message.users === $util.emptyObject)
                            message.users = {};
                        var end2 = reader.uint32() + reader.pos;
                        key = "";
                        value = null;
                        while (reader.pos < end2) {
                            var tag2 = reader.uint32();
                            switch (tag2 >>> 3) {
                            case 1:
                                key = reader.string();
                                break;
                            case 2:
                                value = $root.database.User.decode(reader, reader.uint32());
                                break;
                            default:
                                reader.skipType(tag2 & 7);
                                break;
                            }
                        }
                        message.users[key] = value;
                        break;
                    default:
                        reader.skipType(tag & 7);
                        break;
                    }
                }
                return message;
            };
    
            /**
             * Decodes a Collection message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof database.Collection
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {database.Collection} Collection
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            Collection.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };
    
            /**
             * Verifies a Collection message.
             * @function verify
             * @memberof database.Collection
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            Collection.verify = function verify(message) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                if (message.users != null && message.hasOwnProperty("users")) {
                    if (!$util.isObject(message.users))
                        return "users: object expected";
                    var key = Object.keys(message.users);
                    for (var i = 0; i < key.length; ++i) {
                        var error = $root.database.User.verify(message.users[key[i]]);
                        if (error)
                            return "users." + error;
                    }
                }
                return null;
            };
    
            /**
             * Creates a Collection message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof database.Collection
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {database.Collection} Collection
             */
            Collection.fromObject = function fromObject(object) {
                if (object instanceof $root.database.Collection)
                    return object;
                var message = new $root.database.Collection();
                if (object.users) {
                    if (typeof object.users !== "object")
                        throw TypeError(".database.Collection.users: object expected");
                    message.users = {};
                    for (var keys = Object.keys(object.users), i = 0; i < keys.length; ++i) {
                        if (typeof object.users[keys[i]] !== "object")
                            throw TypeError(".database.Collection.users: object expected");
                        message.users[keys[i]] = $root.database.User.fromObject(object.users[keys[i]]);
                    }
                }
                return message;
            };
    
            /**
             * Creates a plain object from a Collection message. Also converts values to other types if specified.
             * @function toObject
             * @memberof database.Collection
             * @static
             * @param {database.Collection} message Collection
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            Collection.toObject = function toObject(message, options) {
                if (!options)
                    options = {};
                var object = {};
                if (options.objects || options.defaults)
                    object.users = {};
                var keys2;
                if (message.users && (keys2 = Object.keys(message.users)).length) {
                    object.users = {};
                    for (var j = 0; j < keys2.length; ++j)
                        object.users[keys2[j]] = $root.database.User.toObject(message.users[keys2[j]], options);
                }
                return object;
            };
    
            /**
             * Converts this Collection to JSON.
             * @function toJSON
             * @memberof database.Collection
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            Collection.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };
    
            return Collection;
        })();
    
        return database;
    })();

    return $root;
});
