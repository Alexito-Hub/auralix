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
             * @property {number|Long|null} [coins] User coins
             * @property {number|Long|null} [xp] User xp
             * @property {number|null} [level] User level
             * @property {number|null} [warns] User warns
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
             * User coins.
             * @member {number|Long} coins
             * @memberof database.User
             * @instance
             */
            User.prototype.coins = $util.Long ? $util.Long.fromBits(0,0,false) : 0;
    
            /**
             * User xp.
             * @member {number|Long} xp
             * @memberof database.User
             * @instance
             */
            User.prototype.xp = $util.Long ? $util.Long.fromBits(0,0,false) : 0;
    
            /**
             * User level.
             * @member {number} level
             * @memberof database.User
             * @instance
             */
            User.prototype.level = 0;
    
            /**
             * User warns.
             * @member {number} warns
             * @memberof database.User
             * @instance
             */
            User.prototype.warns = 0;
    
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
                if (message.coins != null && Object.hasOwnProperty.call(message, "coins"))
                    writer.uint32(/* id 8, wireType 0 =*/64).int64(message.coins);
                if (message.xp != null && Object.hasOwnProperty.call(message, "xp"))
                    writer.uint32(/* id 9, wireType 0 =*/72).int64(message.xp);
                if (message.level != null && Object.hasOwnProperty.call(message, "level"))
                    writer.uint32(/* id 10, wireType 0 =*/80).int32(message.level);
                if (message.warns != null && Object.hasOwnProperty.call(message, "warns"))
                    writer.uint32(/* id 11, wireType 0 =*/88).int32(message.warns);
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
                    case 8:
                        message.coins = reader.int64();
                        break;
                    case 9:
                        message.xp = reader.int64();
                        break;
                    case 10:
                        message.level = reader.int32();
                        break;
                    case 11:
                        message.warns = reader.int32();
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
                if (message.coins != null && message.hasOwnProperty("coins"))
                    if (!$util.isInteger(message.coins) && !(message.coins && $util.isInteger(message.coins.low) && $util.isInteger(message.coins.high)))
                        return "coins: integer|Long expected";
                if (message.xp != null && message.hasOwnProperty("xp"))
                    if (!$util.isInteger(message.xp) && !(message.xp && $util.isInteger(message.xp.low) && $util.isInteger(message.xp.high)))
                        return "xp: integer|Long expected";
                if (message.level != null && message.hasOwnProperty("level"))
                    if (!$util.isInteger(message.level))
                        return "level: integer expected";
                if (message.warns != null && message.hasOwnProperty("warns"))
                    if (!$util.isInteger(message.warns))
                        return "warns: integer expected";
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
                if (object.coins != null)
                    if ($util.Long)
                        (message.coins = $util.Long.fromValue(object.coins)).unsigned = false;
                    else if (typeof object.coins === "string")
                        message.coins = parseInt(object.coins, 10);
                    else if (typeof object.coins === "number")
                        message.coins = object.coins;
                    else if (typeof object.coins === "object")
                        message.coins = new $util.LongBits(object.coins.low >>> 0, object.coins.high >>> 0).toNumber();
                if (object.xp != null)
                    if ($util.Long)
                        (message.xp = $util.Long.fromValue(object.xp)).unsigned = false;
                    else if (typeof object.xp === "string")
                        message.xp = parseInt(object.xp, 10);
                    else if (typeof object.xp === "number")
                        message.xp = object.xp;
                    else if (typeof object.xp === "object")
                        message.xp = new $util.LongBits(object.xp.low >>> 0, object.xp.high >>> 0).toNumber();
                if (object.level != null)
                    message.level = object.level | 0;
                if (object.warns != null)
                    message.warns = object.warns | 0;
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
                    if ($util.Long) {
                        var long = new $util.Long(0, 0, false);
                        object.coins = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
                    } else
                        object.coins = options.longs === String ? "0" : 0;
                    if ($util.Long) {
                        var long = new $util.Long(0, 0, false);
                        object.xp = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
                    } else
                        object.xp = options.longs === String ? "0" : 0;
                    object.level = 0;
                    object.warns = 0;
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
                if (message.coins != null && message.hasOwnProperty("coins"))
                    if (typeof message.coins === "number")
                        object.coins = options.longs === String ? String(message.coins) : message.coins;
                    else
                        object.coins = options.longs === String ? $util.Long.prototype.toString.call(message.coins) : options.longs === Number ? new $util.LongBits(message.coins.low >>> 0, message.coins.high >>> 0).toNumber() : message.coins;
                if (message.xp != null && message.hasOwnProperty("xp"))
                    if (typeof message.xp === "number")
                        object.xp = options.longs === String ? String(message.xp) : message.xp;
                    else
                        object.xp = options.longs === String ? $util.Long.prototype.toString.call(message.xp) : options.longs === Number ? new $util.LongBits(message.xp.low >>> 0, message.xp.high >>> 0).toNumber() : message.xp;
                if (message.level != null && message.hasOwnProperty("level"))
                    object.level = message.level;
                if (message.warns != null && message.hasOwnProperty("warns"))
                    object.warns = message.warns;
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
    
        database.Group = (function() {
    
            /**
             * Properties of a Group.
             * @memberof database
             * @interface IGroup
             * @property {string|null} [prefix] Group prefix
             * @property {string|null} [welcome] Group welcome
             * @property {string|null} [bye] Group bye
             * @property {boolean|null} [mute] Group mute
             * @property {boolean|null} [antilink] Group antilink
             * @property {boolean|null} [welcomeEnabled] Group welcomeEnabled
             */
    
            /**
             * Constructs a new Group.
             * @memberof database
             * @classdesc Represents a Group.
             * @implements IGroup
             * @constructor
             * @param {database.IGroup=} [properties] Properties to set
             */
            function Group(properties) {
                if (properties)
                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }
    
            /**
             * Group prefix.
             * @member {string} prefix
             * @memberof database.Group
             * @instance
             */
            Group.prototype.prefix = "";
    
            /**
             * Group welcome.
             * @member {string} welcome
             * @memberof database.Group
             * @instance
             */
            Group.prototype.welcome = "";
    
            /**
             * Group bye.
             * @member {string} bye
             * @memberof database.Group
             * @instance
             */
            Group.prototype.bye = "";
    
            /**
             * Group mute.
             * @member {boolean} mute
             * @memberof database.Group
             * @instance
             */
            Group.prototype.mute = false;
    
            /**
             * Group antilink.
             * @member {boolean} antilink
             * @memberof database.Group
             * @instance
             */
            Group.prototype.antilink = false;
    
            /**
             * Group welcomeEnabled.
             * @member {boolean} welcomeEnabled
             * @memberof database.Group
             * @instance
             */
            Group.prototype.welcomeEnabled = false;
    
            /**
             * Creates a new Group instance using the specified properties.
             * @function create
             * @memberof database.Group
             * @static
             * @param {database.IGroup=} [properties] Properties to set
             * @returns {database.Group} Group instance
             */
            Group.create = function create(properties) {
                return new Group(properties);
            };
    
            /**
             * Encodes the specified Group message. Does not implicitly {@link database.Group.verify|verify} messages.
             * @function encode
             * @memberof database.Group
             * @static
             * @param {database.IGroup} message Group message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            Group.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                if (message.prefix != null && Object.hasOwnProperty.call(message, "prefix"))
                    writer.uint32(/* id 1, wireType 2 =*/10).string(message.prefix);
                if (message.welcome != null && Object.hasOwnProperty.call(message, "welcome"))
                    writer.uint32(/* id 2, wireType 2 =*/18).string(message.welcome);
                if (message.bye != null && Object.hasOwnProperty.call(message, "bye"))
                    writer.uint32(/* id 3, wireType 2 =*/26).string(message.bye);
                if (message.mute != null && Object.hasOwnProperty.call(message, "mute"))
                    writer.uint32(/* id 4, wireType 0 =*/32).bool(message.mute);
                if (message.antilink != null && Object.hasOwnProperty.call(message, "antilink"))
                    writer.uint32(/* id 5, wireType 0 =*/40).bool(message.antilink);
                if (message.welcomeEnabled != null && Object.hasOwnProperty.call(message, "welcomeEnabled"))
                    writer.uint32(/* id 6, wireType 0 =*/48).bool(message.welcomeEnabled);
                return writer;
            };
    
            /**
             * Encodes the specified Group message, length delimited. Does not implicitly {@link database.Group.verify|verify} messages.
             * @function encodeDelimited
             * @memberof database.Group
             * @static
             * @param {database.IGroup} message Group message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            Group.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };
    
            /**
             * Decodes a Group message from the specified reader or buffer.
             * @function decode
             * @memberof database.Group
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {database.Group} Group
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            Group.decode = function decode(reader, length) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                var end = length === undefined ? reader.len : reader.pos + length, message = new $root.database.Group();
                while (reader.pos < end) {
                    var tag = reader.uint32();
                    switch (tag >>> 3) {
                    case 1:
                        message.prefix = reader.string();
                        break;
                    case 2:
                        message.welcome = reader.string();
                        break;
                    case 3:
                        message.bye = reader.string();
                        break;
                    case 4:
                        message.mute = reader.bool();
                        break;
                    case 5:
                        message.antilink = reader.bool();
                        break;
                    case 6:
                        message.welcomeEnabled = reader.bool();
                        break;
                    default:
                        reader.skipType(tag & 7);
                        break;
                    }
                }
                return message;
            };
    
            /**
             * Decodes a Group message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof database.Group
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {database.Group} Group
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            Group.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };
    
            /**
             * Verifies a Group message.
             * @function verify
             * @memberof database.Group
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            Group.verify = function verify(message) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                if (message.prefix != null && message.hasOwnProperty("prefix"))
                    if (!$util.isString(message.prefix))
                        return "prefix: string expected";
                if (message.welcome != null && message.hasOwnProperty("welcome"))
                    if (!$util.isString(message.welcome))
                        return "welcome: string expected";
                if (message.bye != null && message.hasOwnProperty("bye"))
                    if (!$util.isString(message.bye))
                        return "bye: string expected";
                if (message.mute != null && message.hasOwnProperty("mute"))
                    if (typeof message.mute !== "boolean")
                        return "mute: boolean expected";
                if (message.antilink != null && message.hasOwnProperty("antilink"))
                    if (typeof message.antilink !== "boolean")
                        return "antilink: boolean expected";
                if (message.welcomeEnabled != null && message.hasOwnProperty("welcomeEnabled"))
                    if (typeof message.welcomeEnabled !== "boolean")
                        return "welcomeEnabled: boolean expected";
                return null;
            };
    
            /**
             * Creates a Group message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof database.Group
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {database.Group} Group
             */
            Group.fromObject = function fromObject(object) {
                if (object instanceof $root.database.Group)
                    return object;
                var message = new $root.database.Group();
                if (object.prefix != null)
                    message.prefix = String(object.prefix);
                if (object.welcome != null)
                    message.welcome = String(object.welcome);
                if (object.bye != null)
                    message.bye = String(object.bye);
                if (object.mute != null)
                    message.mute = Boolean(object.mute);
                if (object.antilink != null)
                    message.antilink = Boolean(object.antilink);
                if (object.welcomeEnabled != null)
                    message.welcomeEnabled = Boolean(object.welcomeEnabled);
                return message;
            };
    
            /**
             * Creates a plain object from a Group message. Also converts values to other types if specified.
             * @function toObject
             * @memberof database.Group
             * @static
             * @param {database.Group} message Group
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            Group.toObject = function toObject(message, options) {
                if (!options)
                    options = {};
                var object = {};
                if (options.defaults) {
                    object.prefix = "";
                    object.welcome = "";
                    object.bye = "";
                    object.mute = false;
                    object.antilink = false;
                    object.welcomeEnabled = false;
                }
                if (message.prefix != null && message.hasOwnProperty("prefix"))
                    object.prefix = message.prefix;
                if (message.welcome != null && message.hasOwnProperty("welcome"))
                    object.welcome = message.welcome;
                if (message.bye != null && message.hasOwnProperty("bye"))
                    object.bye = message.bye;
                if (message.mute != null && message.hasOwnProperty("mute"))
                    object.mute = message.mute;
                if (message.antilink != null && message.hasOwnProperty("antilink"))
                    object.antilink = message.antilink;
                if (message.welcomeEnabled != null && message.hasOwnProperty("welcomeEnabled"))
                    object.welcomeEnabled = message.welcomeEnabled;
                return object;
            };
    
            /**
             * Converts this Group to JSON.
             * @function toJSON
             * @memberof database.Group
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            Group.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };
    
            return Group;
        })();
    
        database.Collection = (function() {
    
            /**
             * Properties of a Collection.
             * @memberof database
             * @interface ICollection
             * @property {Object.<string,database.IUser>|null} [users] Collection users
             * @property {Object.<string,database.IGroup>|null} [groups] Collection groups
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
                this.groups = {};
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
             * Collection groups.
             * @member {Object.<string,database.IGroup>} groups
             * @memberof database.Collection
             * @instance
             */
            Collection.prototype.groups = $util.emptyObject;
    
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
                if (message.groups != null && Object.hasOwnProperty.call(message, "groups"))
                    for (var keys = Object.keys(message.groups), i = 0; i < keys.length; ++i) {
                        writer.uint32(/* id 2, wireType 2 =*/18).fork().uint32(/* id 1, wireType 2 =*/10).string(keys[i]);
                        $root.database.Group.encode(message.groups[keys[i]], writer.uint32(/* id 2, wireType 2 =*/18).fork()).ldelim().ldelim();
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
                    case 2:
                        if (message.groups === $util.emptyObject)
                            message.groups = {};
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
                                value = $root.database.Group.decode(reader, reader.uint32());
                                break;
                            default:
                                reader.skipType(tag2 & 7);
                                break;
                            }
                        }
                        message.groups[key] = value;
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
                if (message.groups != null && message.hasOwnProperty("groups")) {
                    if (!$util.isObject(message.groups))
                        return "groups: object expected";
                    var key = Object.keys(message.groups);
                    for (var i = 0; i < key.length; ++i) {
                        var error = $root.database.Group.verify(message.groups[key[i]]);
                        if (error)
                            return "groups." + error;
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
                if (object.groups) {
                    if (typeof object.groups !== "object")
                        throw TypeError(".database.Collection.groups: object expected");
                    message.groups = {};
                    for (var keys = Object.keys(object.groups), i = 0; i < keys.length; ++i) {
                        if (typeof object.groups[keys[i]] !== "object")
                            throw TypeError(".database.Collection.groups: object expected");
                        message.groups[keys[i]] = $root.database.Group.fromObject(object.groups[keys[i]]);
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
                if (options.objects || options.defaults) {
                    object.users = {};
                    object.groups = {};
                }
                var keys2;
                if (message.users && (keys2 = Object.keys(message.users)).length) {
                    object.users = {};
                    for (var j = 0; j < keys2.length; ++j)
                        object.users[keys2[j]] = $root.database.User.toObject(message.users[keys2[j]], options);
                }
                if (message.groups && (keys2 = Object.keys(message.groups)).length) {
                    object.groups = {};
                    for (var j = 0; j < keys2.length; ++j)
                        object.groups[keys2[j]] = $root.database.Group.toObject(message.groups[keys2[j]], options);
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
