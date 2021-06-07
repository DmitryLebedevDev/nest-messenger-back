import { IsNotEmpty, IsString } from 'class-validator'
import { Type } from 'class-transformer'

export class RTCSessionDescriptionDto {
  @IsNotEmpty()
  @IsString()
  sdp: string

  @IsNotEmpty()
  @IsString()
  type: RTCSdpType
}

export class ConnectToStreamDto {
  @IsNotEmpty()
  @IsString()
  to: string

  @IsNotEmpty()
  @IsString()
  from: string

  @IsNotEmpty()
  @Type(() => RTCSessionDescriptionDto)
  desc: RTCSessionDescription
}