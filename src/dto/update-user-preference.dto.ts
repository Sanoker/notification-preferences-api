/* eslint-disable prettier/prettier */
import { TestBed } from '@angular/core/testing';
describe('UserPreferencesService', () => {
  let service: UserPreferencesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserPreferencesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

import { IsOptional, IsString, IsBoolean } from 'class-validator';
import { UserPreferencesService } from 'src/user-preferences/user-preferences.service';

export class UpdateUserPreferenceDto {
  @IsString()
  @IsOptional()
  email?: string;

  @IsBoolean()
  @IsOptional()
  marketing?: boolean;

  @IsBoolean()
  @IsOptional()
  newsletter?: boolean;

  @IsBoolean()
  @IsOptional()
  updates?: boolean;

  @IsString()
  @IsOptional()
  frequency?: string;

  @IsOptional()
  channels?: {
    email?: boolean;
    sms?: boolean;
    push?: boolean;
  };
}


describe('UserPreferencesService', () => {
  let service: UserPreferencesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserPreferencesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});