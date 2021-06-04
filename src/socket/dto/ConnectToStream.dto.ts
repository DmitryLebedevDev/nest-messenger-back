import { isNotEmpty, IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { Type } from 'class-transformer';

export class RTCSessionDescriptionDto {
  @IsNotEmpty()
  @IsString()
  sdp: string;

  @IsNotEmpty()
  @IsString()
  type: RTCSdpType;
}

export class ConnectToStreamDto {
  @IsNotEmpty()
  @IsString()
  to

  @IsNotEmpty()
  @IsString()
  from: string

  @IsNotEmpty()
  @Type(() => RTCSessionDescriptionDto)
  desc: RTCSessionDescription
}