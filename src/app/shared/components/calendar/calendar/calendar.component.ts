import {Component, input, Input, OnDestroy, OnInit, Type} from '@angular/core';
import {CommonModule} from "@angular/common";
import {DayViewComponent} from "../day-view/day-view.component";
import {WeekViewComponent} from "../week-view/week-view.component";
import {MonthViewComponent} from "../month-view/month-view.component";
import {MobileViewComponent} from "../mobile-view/mobile-view.component";
import {combineLatest, Subject, takeUntil} from "rxjs";
import {CalendarEvent, ViewMode} from "../../../interfaces/appointment.interface";
import {CalendarService} from "../../../services/calendar/calendar.service";
import {DialogService, DynamicDialogRef} from "primeng/dynamicdialog";
import {RequestData} from "../../request-data";
import {CrudService} from "../../../services/crud/crud.service";
import {LoadingService} from "../../../services/loading/loading.service";
import {ToastService} from "../../../services/toast/toast.service";
import {TranslateService} from "../../../services/translate/translate.service";
import {CookiesService} from "../../../services/cookies/cookies.service";

@Component({
  selector: 'app-calendar',
  imports: [
    CommonModule,
    DayViewComponent,
    WeekViewComponent,
    MonthViewComponent,
    MobileViewComponent
  ],
  providers: [
    DialogService,
    CrudService,
    ToastService
  ],
  templateUrl: './calendar.component.html',
  styleUrl: './calendar.component.scss'
})
export class CalendarComponent implements OnInit, OnDestroy  {

  @Input() isMobileView: boolean = false;
  @Input() component?: Type<any>;
  @Input() router: string = "";

  private destroy$ = new Subject<void>();

  currentDate: Date = new Date();
  currentViewMode: ViewMode = 'month';
  currentAppointments: CalendarEvent[] = [];
  appointments: CalendarEvent[] = [];
  viewModes: ViewMode[] = ['day', 'week', 'month'];
  userData: any;
  requestData: RequestData = new RequestData();

  ref: DynamicDialogRef | undefined;
  originalClose: any;


  constructor(
    private calendarService: CalendarService,
    private readonly dialogService: DialogService,
    private readonly crudService: CrudService,
    private readonly loadingService: LoadingService,
    private readonly toastService: ToastService,
    private readonly translateService: TranslateService
  ) {}

  ngOnInit() {
    combineLatest([
      this.calendarService.currentDate$,
      this.calendarService.viewMode$,
      this.calendarService.appointments$
    ]).pipe(
      takeUntil(this.destroy$)
    ).subscribe(([date, viewMode, appointments]) => {
      this.currentDate = date;
      this.currentViewMode = viewMode;
      this.appointments = appointments;
      this.updateCurrentAppointments(appointments);
    });
    this.requestData.size = 999999;
    this.onLoadAllData(this.requestData);
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private updateCurrentAppointments(appointments: CalendarEvent[]) {
    switch (this.currentViewMode) {
      case 'day':
        this.currentAppointments = this.calendarService.getAppointmentsForDate(this.currentDate);
        break;
      case 'week':
        const weekStart = this.getWeekStart(this.currentDate);
        this.currentAppointments = this.calendarService.getAppointmentsForWeek(weekStart);
        break;
      case 'month':
        this.currentAppointments = appointments.filter(appointment =>
          appointment.startTime.getMonth() === this.currentDate.getMonth() &&
          appointment.startTime.getFullYear() === this.currentDate.getFullYear()
        );
        break;
    }
  }

  setViewMode(mode: ViewMode) {
    this.calendarService.setViewMode(mode);
  }

  goToPrevious() {
    const newDate = new Date(this.currentDate);

    switch (this.currentViewMode) {
      case 'day':
        newDate.setDate(newDate.getDate() - 1);
        break;
      case 'week':
        newDate.setDate(newDate.getDate() - 7);
        break;
      case 'month':
        newDate.setMonth(newDate.getMonth() - 1);
        break;
    }

    this.calendarService.setCurrentDate(newDate);
  }

  goToNext() {
    const newDate = new Date(this.currentDate);

    switch (this.currentViewMode) {
      case 'day':
        newDate.setDate(newDate.getDate() + 1);
        break;
      case 'week':
        newDate.setDate(newDate.getDate() + 7);
        break;
      case 'month':
        newDate.setMonth(newDate.getMonth() + 1);
        break;
    }

    this.calendarService.setCurrentDate(newDate);
  }

  goToToday() {
    this.calendarService.setCurrentDate(new Date());
  }

  getCurrentPeriodTitle(): string {
    switch (this.currentViewMode) {
      case 'day':
        return this.currentDate.toLocaleDateString('pt-BR', {
          weekday: 'long',
          year: 'numeric',
          month: 'long',
          day: 'numeric'
        });
      case 'week':
        const weekStart = this.getWeekStart(this.currentDate);
        const weekEnd = new Date(weekStart);
        weekEnd.setDate(weekEnd.getDate() + 6);
        return `${weekStart.toLocaleDateString('pt-BR', { month: 'short', day: 'numeric' })} - ${weekEnd.toLocaleDateString('pt-BR', { month: 'short', day: 'numeric', year: 'numeric' })}`;
      case 'month':
        return this.currentDate.toLocaleDateString('pt-BR', {
          year: 'numeric',
          month: 'long'
        });
      default:
        return '';
    }
  }

  private getWeekStart(date: Date): Date {
    const start = new Date(date);
    const day = start.getDay();
    start.setDate(start.getDate() - day);
    return start;
  }

  private includeFilters(requestData: RequestData) {
    var filter = "";
    requestData.filter = filter + requestData.filter;
    return requestData;
  }

  onLoadAllData(requestData: RequestData): void {
    this.loadingService.showLoading.next(true);
    requestData = this.includeFilters(requestData);
    this.crudService.onGetAll(this.router,requestData).subscribe({
      next: (res) => {
        //aqui vai ter que ter tratamento vamos usar a função pronta do service
        const appointments = this.calendarService.onConvertAppointment(res.contents);
        this.loadingService.showLoading.next(false);
        this.calendarService.loadAppointments(appointments);
      },
      error: (err) => {
        this.loadingService.showLoading.next(false);
      }
    });
  }

  onLoadData(id: any, obj: any): void {
    this.loadingService.showLoading.next(true);
    this.crudService.onGet(this.router,id).subscribe({
      next: (res) => {
        this.loadingService.showLoading.next(false);
        this.onOpenModal(res);
      },
      error: (err) => {
        this.loadingService.showLoading.next(false);
        this.onToast(0,err.error.message);
      }
    });
  }

  onDelete(id: any): void {
    this.loadingService.showLoading.next(true);
    this.crudService.onDelete(this.router,id).subscribe({
      next: (res) => {
        this.onLoadAllData(new RequestData());
        this.loadingService.showLoading.next(false);
        this.onToast(1,"");
      },
      error: (err) => {
        this.loadingService.showLoading.next(false);
        this.onToast(0,err.error.message);
      }
    });
  }

  onSave(param: any): void {
    this.loadingService.showLoading.next(true);
    this.crudService.onSave(this.router,param).subscribe({
      next: (res) => {
        this.onLoadAllData(new RequestData());
        this.loadingService.showLoading.next(false);
        this.originalClose(null);
        this.onToast(1,"");
      },
      error: (err) => {
        this.loadingService.showLoading.next(false);
        this.onToast(0,err.error.message);
      }
    });
  }

  onUpdate(param: any): void {
    this.loadingService.showLoading.next(true);
    this.crudService.onUpdate(this.router,param.id,param).subscribe({
      next: (res) => {
        this.onLoadAllData(new RequestData());
        this.loadingService.showLoading.next(false);
        this.originalClose(null);
        this.onToast(1,"");
      },
      error: (err) => {
        this.loadingService.showLoading.next(false);
        this.onToast(0,err.error.message);
      }
    });
  }

  onSelectedData(obj: any): void {
    if(obj.data){
      if(obj.action === 0){// delete data
        this.onDelete(obj.data.id);
      } else {
        if( obj.action === 2){
          this.onOpenModal(obj);
        } else {
          // quando edita, tenho que mandar a porra do parent tbm
          this.onLoadData(obj.data.id, obj);
        }
      }
    } else{
      this.onOpenModal(null);
    }
  }

  async onOpenModal(obj: any){
    if(this.component){
      this.ref = this.dialogService.open(this.component,
      {
        header: "Agendamento",
        width: '80vw',
        modal:true,
        closable: true,
        draggable: true,
        maximizable: false,
        data: obj,
        baseZIndex: 999998,
      });

      this.originalClose = this.ref.close.bind(this.ref);
      this.ref.close = (result: any) => {
        if (result) {
          if(!result.id){
            this.onSave(result);
          } else {
            this.onUpdate(result);
          }
        } else {
          this.originalClose(null);
        }
      };

    }




  }

  onToast(type: number, message: string): void {
    if(type === 0){
      this.toastService.error({summary: "Mensagem", detail: message});
    } else {
      this.toastService.success({summary: "Mensagem", detail: this.translateService.translate("common_message_success")});
    }
  }

  onEventScheduler(obj: any){
    this.onOpenModal(obj);
  }


}
