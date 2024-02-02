import { Component, OnInit } from '@angular/core';
import { Consulta } from '../models';


import { CalendarOptions,Calendar } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import esLocale from '@fullcalendar/core/locales/es';
import listPlugin from '@fullcalendar/list';
import { ServiceService } from '../service.service';



@Component({
  selector: 'app-calendario',
  templateUrl: './calendario.component.html',
  styleUrls: ['./calendario.component.css']
})
export class CalendarioComponent implements OnInit {

  constructor(private service: ServiceService) { }

  ngOnInit(): void {

    this.getConsultas()

  }
consultas:Consulta[]=[]

calendarApi: any;

  
calendarOptions: CalendarOptions = {
  // ... otras opciones del calendario
  plugins: [dayGridPlugin, timeGridPlugin,listPlugin], // Registra los complementos aquí
  initialView: 'listWeek', // Esta es una vista semanal, puedes cambiarla según tus necesidades
  locale: esLocale, // Establecer el idioma español

  headerToolbar: {
      left: 'prev,next',
      center: 'title', // Esto mostrará el título en el centro
      right: 'timeGridWeek,timeGridDay,listWeek'
    },  
    
    allDaySlot: false,
    slotDuration: '00:30:00', // Duración de 30 minutos para cada slot
    slotLabelFormat: { hour: 'numeric', minute: '2-digit', hour12: false },
    height: 'auto', // Altura automática para adaptarse al contenido
    slotMinTime: '08:00',
    slotMaxTime: '19:00',
    slotLabelInterval: '01:00',
    hiddenDays: [0, 6],
    aspectRatio: 2,
    slotEventOverlap: false,

    
  businessHours: [
    // Horas laborales para mostrar distintas apariencias o comportamientos
    {
      daysOfWeek: [1, 2, 3, 4, 5], // Lunes a viernes
      startTime: '08:00', // Hora de inicio del horario laboral (8:00 AM)
      endTime: '13:00' // Hora de finalización del horario laboral (12:00 PM)
    },
    {
      daysOfWeek: [1, 2, 3, 4, 5], // Lunes a viernes
      startTime: '16:00', // Segundo horario laboral (4:00 PM)
      endTime: '18:00' // Hora de finalización del segundo horario laboral (6:00 PM)
    }
  ], 
 
  events: this.getEventos(),
 // eventContent: this.customEventContent.bind(this),
}; 



getConsultas() {
  this.service.getConsultas()
    .subscribe((data: any) => {
      this.consultas = data;
      this.refreshCalendarEvents();
    });
}

refreshCalendarEvents() {  
  this.calendarOptions.events = this.getEventos();   
} 

getEventos() {
  const eventosNoDisponibles = this.getEventosNoDisponibles();
  const eventosDisponibles = this.getDiasSinEventos();

  // Filtrar eventos de "Turno disponible" en días y horas donde ya hay eventos "No disponibles"
  const eventosFiltrados = eventosDisponibles.filter(eventoDisponible => {
    return !eventosNoDisponibles.some(eventoNoDisponible =>
      this.sonMismoDiaYHora(eventoDisponible.start, eventoNoDisponible.start)
    );
  });

  return [...eventosNoDisponibles, ...eventosFiltrados];
}

getEventosNoDisponibles() {
  return this.consultas.map((consulta: any) => ({
    title: 'Dr/a ' + consulta.medico.nombre + ' No disponible',     
    start: this.formatDate(consulta.fechaAgendarTurno),
    backgroundColor: 'lightcoral',      
  }));
}

getDiasSinEventos() {
  const diasSinEventos: { title: string; start: Date; end: Date; backgroundColor: string; }[] = [];

  const todosLosDias = ['domingo', 'lunes', 'martes', 'miércoles', 'jueves', 'viernes', 'sábado'];

  todosLosDias.forEach(dia => {
    for (let i = 8; i < 18; i++) {
      const fechaProximoDiaInicio = this.getFechaProximo(dia, i);
      const fechaProximoDiaFin = this.getFechaProximo(dia, i, 30);

      const hayConflicto = this.consultas.some(consulta => {
        const inicioConsulta = new Date(consulta.fechaAgendarTurno);
        const finConsulta = new Date(inicioConsulta.getTime() + 30 * 60 * 1000);

        return (
          (fechaProximoDiaInicio >= inicioConsulta && fechaProximoDiaInicio < finConsulta) ||
          (fechaProximoDiaFin > inicioConsulta && fechaProximoDiaFin <= finConsulta) ||
          (fechaProximoDiaInicio <= inicioConsulta && fechaProximoDiaFin >= finConsulta)
        );
      });

      if (!hayConflicto) {
        const eventoDisponible = {
          title: 'Turno disponible',
          start: fechaProximoDiaInicio,
          end: fechaProximoDiaFin,
          backgroundColor: 'lightgreen',
        };

        diasSinEventos.push(eventoDisponible);
      }
    }
  });

  return diasSinEventos;
}

getFechaProximo(dia: string, hora: number, minutos: number = 0): Date {
  const todosLosDias = ['domingo', 'lunes', 'martes', 'miércoles', 'jueves', 'viernes', 'sábado'];
  const hoy = new Date();
  const diaActual = hoy.getDay();
  const diaBuscado = todosLosDias.indexOf(dia);

  let diasHastaProximoDia = diaBuscado - diaActual;
  if (diasHastaProximoDia <= 0) {
    diasHastaProximoDia += 7;
  }

  const fechaProximoDia = new Date(hoy.setDate(hoy.getDate() + diasHastaProximoDia));
  fechaProximoDia.setHours(hora, minutos, 0, 0);

  return fechaProximoDia;
}

sonMismoDiaYHora(fecha1: Date, fecha2: Date): boolean {
  return (
    fecha1.getFullYear() === fecha2.getFullYear() &&
    fecha1.getMonth() === fecha2.getMonth() &&
    fecha1.getDate() === fecha2.getDate() &&
    fecha1.getHours() === fecha2.getHours() &&
    fecha1.getMinutes() === fecha2.getMinutes()
  );
}




  formatDate(fecha: string): Date {
    if (!fecha) {
      return new Date(); // Otra acción por defecto si la fecha está undefined
    }
  
    const parts = fecha.split(' ');
    if (parts.length !== 2) {
      return new Date(); // Otra acción por defecto si el formato no es el esperado
    }
  
    const [fechaPart, horaPart] = parts;
    const [dia, mes, anio] = fechaPart.split('-');
    const [hora, minutos] = horaPart.split(':');
  
    const isoString = `${anio}-${mes}-${dia}T${hora}:${minutos}`;
    return new Date(isoString);
  }


  


}
