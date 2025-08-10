import mongoose, { Schema, model, models, Model } from "mongoose";

export const VIDEO_DIMENSIONS = {
  width: 1080,
  height: 1920,
} as const;

export interface IVideo {
  _id?: mongoose.Types.ObjectId;
  title: string;
  description: string;
  videoURL: string;
  thumbnailURL: string;
  controls?: boolean;
  transformation?: {
    height: number;
    width: number;
    quality?: number;
  };
}

const videoSchema = new Schema<IVideo>({
  title: {
    type: String,
    required: true,
  },

  description: {
    type: String,
    required: true,
  },

  videoURL: {
    type: String,
    required: true,
  },

  thumbnailURL: {
    type: String,
    required: true,
  },

  controls: {
    type: Boolean,
    default: true,
  },

  transformation: {
    height: {
      type: Number,
      default: VIDEO_DIMENSIONS,
    },

    width: {
      type: Number,
      default: VIDEO_DIMENSIONS,
    },

    quality: {
      type: Number,
      min: 1,
      max: 100,
    },
  },
});

const Video =
  (models.Video as Model<IVideo>) || model<IVideo>("Video", videoSchema);

export default Video;
