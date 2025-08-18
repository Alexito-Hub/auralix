import * as $protobuf from "protobufjs";
/** Namespace database. */
export namespace database {

    /** Properties of a User. */
    interface IUser {

        /** User email */
        email?: (string|null);

        /** User passwordHash */
        passwordHash?: (string|null);

        /** User banned */
        banned?: (boolean|null);

        /** User name */
        name?: (string|null);

        /** User age */
        age?: (number|null);

        /** User createdAt */
        createdAt?: (number|Long|null);

        /** User updatedAt */
        updatedAt?: (number|Long|null);
    }

    /** Represents a User. */
    class User implements IUser {

        /**
         * Constructs a new User.
         * @param [properties] Properties to set
         */
        constructor(properties?: database.IUser);

        /** User email. */
        public email: string;

        /** User passwordHash. */
        public passwordHash: string;

        /** User banned. */
        public banned: boolean;

        /** User name. */
        public name: string;

        /** User age. */
        public age: number;

        /** User createdAt. */
        public createdAt: (number|Long);

        /** User updatedAt. */
        public updatedAt: (number|Long);

        /**
         * Creates a new User instance using the specified properties.
         * @param [properties] Properties to set
         * @returns User instance
         */
        public static create(properties?: database.IUser): database.User;

        /**
         * Encodes the specified User message. Does not implicitly {@link database.User.verify|verify} messages.
         * @param message User message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: database.IUser, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified User message, length delimited. Does not implicitly {@link database.User.verify|verify} messages.
         * @param message User message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: database.IUser, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a User message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns User
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): database.User;

        /**
         * Decodes a User message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns User
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): database.User;

        /**
         * Verifies a User message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a User message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns User
         */
        public static fromObject(object: { [k: string]: any }): database.User;

        /**
         * Creates a plain object from a User message. Also converts values to other types if specified.
         * @param message User
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: database.User, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this User to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a Collection. */
    interface ICollection {

        /** Collection users */
        users?: ({ [k: string]: database.IUser }|null);
    }

    /** Represents a Collection. */
    class Collection implements ICollection {

        /**
         * Constructs a new Collection.
         * @param [properties] Properties to set
         */
        constructor(properties?: database.ICollection);

        /** Collection users. */
        public users: { [k: string]: database.IUser };

        /**
         * Creates a new Collection instance using the specified properties.
         * @param [properties] Properties to set
         * @returns Collection instance
         */
        public static create(properties?: database.ICollection): database.Collection;

        /**
         * Encodes the specified Collection message. Does not implicitly {@link database.Collection.verify|verify} messages.
         * @param message Collection message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: database.ICollection, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified Collection message, length delimited. Does not implicitly {@link database.Collection.verify|verify} messages.
         * @param message Collection message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: database.ICollection, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a Collection message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns Collection
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): database.Collection;

        /**
         * Decodes a Collection message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns Collection
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): database.Collection;

        /**
         * Verifies a Collection message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a Collection message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns Collection
         */
        public static fromObject(object: { [k: string]: any }): database.Collection;

        /**
         * Creates a plain object from a Collection message. Also converts values to other types if specified.
         * @param message Collection
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: database.Collection, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this Collection to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }
}
