import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';
import { Type } from 'class-transformer';

export class RTCIceCandidateInitDto {
  @IsOptional()
  @IsString()
  candidate?: string;

  @IsOptional()
  @IsNumber()
  sdpMLineIndex?: number | null;

  @IsOptional()
  @IsString()
  sdpMid?: string | null;

  @IsOptional()
  @IsString()
  usernameFragment?: string | null;
}

export class ConnectToStreamIcesDto {
  @IsNotEmpty()
  @IsString()
  to

  @IsNotEmpty()
  @IsString()
  from: string

  @IsNotEmpty()
  @Type(() => RTCIceCandidateInitDto)
  ices: RTCIceCandidateInit[]
}