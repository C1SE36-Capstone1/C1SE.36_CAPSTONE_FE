import { TestBed } from '@angular/core/testing';
import { ThongBaoService } from './thongbao.service';



describe('ThongbaoService', () => {
  let service: ThongBaoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ThongBaoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
