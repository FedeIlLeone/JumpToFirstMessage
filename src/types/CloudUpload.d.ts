import type EventEmitter from "events";
import type { Backoff } from "replugged/dist/renderer/modules/common/api";

declare enum UploadPlatform {
  REACT_NATIVE,
  WEB,
}

type FileType =
  | "photoshop"
  | "webcode"
  | "image"
  | "video"
  | "acrobat"
  | "ae"
  | "sketch"
  | "ai"
  | "archive"
  | "code"
  | "document"
  | "spreadsheet"
  | "webcode"
  | "audio"
  | "unknown";

interface ItemReactNative {
  durationSecs: number;
  file: File;
  filename: string;
  isClip?: boolean;
  isRemix: boolean;
  mimeType: string;
  origin: string;
  platform: UploadPlatform.REACT_NATIVE;
  uri: string;
  waveform: string;
}

interface ItemWeb {
  file: File;
  isClip?: boolean;
  isThumbnail: boolean;
  platform: UploadPlatform.WEB;
}

type Item = ItemReactNative | ItemWeb;

declare class Upload extends EventEmitter {
  public constructor(item: Item, showLargeMessageDialog: boolean);

  public classification?: FileType;
  public description: null;
  public durationSecs?: number;
  public filename: string;
  public id: string;
  public isClip: boolean | undefined;
  public isImage: boolean;
  public isRemix?: boolean;
  public isThumbnail?: boolean;
  public isVideo: boolean;
  public item: Item;
  public mimeType: string;
  public origin?: string;
  public sensitive: boolean;
  public showLargeMessageDialog: boolean;
  public spoiler: boolean;
  public uniqueId: string;
  public uri?: string;
  public waveform?: string;

  public cancel: () => void;
  public resetState: () => this;
}

declare enum CloudUploadStatus {
  NOT_STARTED = "NOT_STARTED",
  STARTED = "STARTED",
  UPLOADING = "UPLOADING",
  ERROR = "ERROR",
  COMPLETED = "COMPLETED",
  CANCELED = "CANCELED",
}

interface RetryOptions {
  backoff: Backoff;
  retries: number;
  timeout: number;
}

declare class CloudUpload extends Upload {
  public constructor(
    item: Item,
    channelId: string,
    showLargeMessageDialog: boolean,
    reactNativeFileIndex: number,
  );

  public static fromJson: () => void;

  private _abortController: AbortController;
  private _aborted: boolean;
  public channelId: string;
  public currentSize: number;
  public error?: string;
  public isClip: boolean;
  public loaded: number;
  public postCompressionSize?: number;
  public preCompressionSize: number;
  public reactNativeFileIndex: number;
  public reactNativeFilePrepped: boolean;
  public status: CloudUploadStatus;
  public uploadedFilename?: string;

  public cancel: () => void;
  public delete: () => Promise<void>;
  public getSize: () => Promise<number>;
  public handleComplete: (response: Record<string, unknown>) => void;
  public handleError: (error: Error | number) => void;
  public reactNativeCompressAndExtractData: () => Promise<void>;
  public resetState: () => CloudUpload;
  public retryOpts: () => RetryOptions;
  public setFilename: (filename: string) => void;
  public setResponseUrl: (responseUrl: string) => void;
  public setStatus: (status: CloudUploadStatus) => void;
  public setUploadedFilename: (uploadedFilename: string) => void;
  public upload: () => Promise<void>;
  public uploadFileToCloud: () => Record<string, unknown>;
}
