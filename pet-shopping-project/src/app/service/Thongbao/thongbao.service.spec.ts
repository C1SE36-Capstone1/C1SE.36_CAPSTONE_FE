import { TestBed } from '@angular/core/testing';

import { ThongbaoService } from './thongbao.service';

describe('ThongbaoService', () => {
  let service: ThongbaoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ThongbaoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
