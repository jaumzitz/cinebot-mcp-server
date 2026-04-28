function validateAttendanceHours() {

const workingHours = [8,9,10,11,12,13,14,15,16,17,18,19]
const workingDays = [
  { weekDay: 'domingo',       isWorkTime: false },
  { weekDay: 'segunda-feira', isWorkTime: true  },
  { weekDay: 'terça-feira',   isWorkTime: true  },
  { weekDay: 'quarta-feira',  isWorkTime: true  },
  { weekDay: 'quinta-feira',  isWorkTime: true  },
  { weekDay: 'sexta-feira',   isWorkTime: true  },
  { weekDay: 'sábado',        isWorkTime: false },
]

const currentDate = new Date()
const currentDay = currentDate.getDay()
const currentHour = currentDate.getHours()
    
//se não é um dia de trabalho
if (!workingDays[currentDay].isWorkTime)  {
    console.log('Não é um dia de atendimento')
    return workingDays[currentDay]
}

//se está dentro do horário de atendimento e é um dia de trabalho
if (workingHours.includes(currentHour)) {
    console.log('Dentro do horário de atendimento')
    return workingDays[currentDay]
}

console.log('Fora do horário de atendimento')
//fora do horário de atendimento
return { ...workingDays[currentDay], isWorkTime: false}
    
}