// Generated by typings
// Source: https://raw.githubusercontent.com/DefinitelyTyped/DefinitelyTyped/d21f1bd1fd079bbc18bc88ed71d2be7f5707e33a/FileSaver/FileSaver.d.ts
// Type definitions for FileSaver.js
// Project: https://github.com/eligrey/FileSaver.js/
// Definitions by: Cyril Schumacher <https://github.com/cyrilschumacher>
// Definitions: https://github.com/DefinitelyTyped/DefinitelyTyped

/**
 * @summary Interface for "saveAs" function.
 * @author  Cyril Schumacher
 * @version 1.0
 */
interface FileSaver {
    (
        /**
         * @summary Data.
         * @type {Blob}
         */
        data: Blob,

        /**
         * @summary File name.
         * @type {DOMString}
         */
	 filename: string,

	 /**
	  * @summary Disable Unicode text encoding hints or not.
	  * @type {boolean}
	  */
	 disableAutoBOM?: boolean
    ): void
}

declare var saveAs: FileSaver;

declare module "file-saver" {
    var fileSaver: { saveAs: typeof saveAs };
    export = fileSaver
}