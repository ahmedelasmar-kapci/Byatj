import { Document } from 'mongoose';

export interface IDriverLocation {
  lat: number;
  lng: number;
  updatedAt: Date;
}

export interface IDriver extends Document {
  driverId: string;
  online: boolean;
  lastOnlineAt?: Date;
  lastLocation?: IDriverLocation;
  location?: {
    type: 'Point';
    coordinates: [number, number]; // [lng, lat]
  };
}
