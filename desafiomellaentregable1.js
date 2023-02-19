class TicketManager{
    #baseProfit;

    constructor(){
        this.events = [];
        this.#baseProfit = 0.15;

    }

    getEvents = () => {
        console.log(this.events);
        return; 
    }

////////////////////////////////////////////////////////////////////////////////    

    createEvent = (name,place,price,capacity,date) => {
      const event = {  
            id: this.events.length + 1,
            name:name,
            place:place,
            price:price + this.#baseProfit,
            capacity:capacity ?? 50, //nullish
            date:date ?? this.#formatDate(),
            participants:[],
            };
       this.events.push(event);
    };
////////////////////////////////////////////////////////////////////////

    addParticipant = (eventId,participantId) => {
      const eventIndex = this.events.findIndex((event) => event.id === eventId);

        if (eventIndex === -1)  {   //no encuentra indice
            console.log("this event does not exist");
        return;
        }
    
       const participantExists= this.events[eventIndex].participants.includes(participantId);

        if (participantExists){
            console.log("this usser has already singed up for ths event!")
            return;
        }

        this.events[eventIndex].participants.push(participantId);
    };

///////////////////////////////////////////////////////////////////////////////////////////////

    reschedulEvent = (eventeId, newPlace,newDate) => {
       const event = this.events.find((event) => event.id === eventeId )

       if (!event){
          console.log("event no fout");
          return;
       }

       const newEvent = {
        ...event,
        id: this.events.length + 1 ,
        place: newPlace,
        date: newDate,
        participants:[],
       };

       this.events.push(newEvent);
       return;
     };
     
////////////////////////////////////////////////////////////////////////////////////
    

    #formatDate = () => {
        const date = new Date();
        const day =  date.getDay();
        const month = date.getMonth();
        const yeart = date.getFullYear();

        return `${day}/${month}/${yeart}`

    };

}

const ticketManager = new TicketManager();
//ticketManager.getEvents();
ticketManager.createEvent("evento confluencia", "neuquen", 150, 100, "30/03/2023");
ticketManager.createEvent("evento comicon", "neuquen", 95);
ticketManager.addParticipant(1,1);
ticketManager.reschedulEvent(1,"santiago" , "17/02/2023");

ticketManager.getEvents();