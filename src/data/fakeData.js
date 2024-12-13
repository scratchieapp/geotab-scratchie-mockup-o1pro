export const drivers = [
    { 
      id: 1, 
      name: "John Smith",
      photoUrl: "/driver-avatars/Driver1.jpeg",
      safetyScore: 98, trend: "+2%", perfectStreak: 14, fuelEfficiency: "94%", onTime: "100%", lastScratchie: "2 days ago", incidents: 0, 
      scratchieCarrotsWeek: 50, scratchieCarrotsMonth: 200 
    },
    { 
      id: 2, 
      name: "Sarah Johnson",
      photoUrl: "/driver-avatars/Driver2.jpeg",
      safetyScore: 96, trend: "+1%", perfectStreak: 10, fuelEfficiency: "92%", onTime: "98%", lastScratchie: "4 days ago", incidents: 0, 
      scratchieCarrotsWeek: 40, scratchieCarrotsMonth: 180 
    },
    { 
      id: 3, 
      name: "Mike Williams",
      photoUrl: "/driver-avatars/Driver3.jpeg",
      safetyScore: 95, trend: "+3%", perfectStreak: 8, fuelEfficiency: "90%", onTime: "97%", lastScratchie: "6 days ago", incidents: 1, 
      scratchieCarrotsWeek: 60, scratchieCarrotsMonth: 220 
    },
    { 
      id: 4, 
      name: "Emily Brown",
      photoUrl: "/driver-avatars/Driver4.jpeg",
      safetyScore: 93, trend: "+4%", perfectStreak: 6, fuelEfficiency: "88%", onTime: "96%", lastScratchie: "8 days ago", incidents: 2, 
      scratchieCarrotsWeek: 70, scratchieCarrotsMonth: 240 
    },
    { 
      id: 5, 
      name: "David Lee",
      photoUrl: "/driver-avatars/Driver5.jpeg",
      safetyScore: 91, trend: "+5%", perfectStreak: 4, fuelEfficiency: "86%", onTime: "95%", lastScratchie: "10 days ago", incidents: 3, 
      scratchieCarrotsWeek: 80, scratchieCarrotsMonth: 260 
    },
    { 
      id: 6, 
      name: "Jessica Chen",
      photoUrl: "/driver-avatars/Driver6.jpeg",
      safetyScore: 89, trend: "+6%", perfectStreak: 2, fuelEfficiency: "84%", onTime: "94%", lastScratchie: "12 days ago", incidents: 4, 
      scratchieCarrotsWeek: 90, scratchieCarrotsMonth: 280 
    },
    { 
      id: 7, 
      name: "William Kim",
      photoUrl: "/driver-avatars/Driver7.jpeg",
      safetyScore: 87, trend: "+7%", perfectStreak: 0, fuelEfficiency: "82%", onTime: "93%", lastScratchie: "14 days ago", incidents: 5, 
      scratchieCarrotsWeek: 100, scratchieCarrotsMonth: 300 
    },
    { 
      id: 8, 
      name: "Olivia Nguyen",
      photoUrl: "/driver-avatars/Driver8.jpeg",
      safetyScore: 85, trend: "+8%", perfectStreak: -2, fuelEfficiency: "80%", onTime: "92%", lastScratchie: "16 days ago", incidents: 6, 
      scratchieCarrotsWeek: 110, scratchieCarrotsMonth: 320 
    },
    { 
      id: 9, 
      name: "Benjamin Tran",
      photoUrl: "/driver-avatars/Driver9.jpeg",
      safetyScore: 83, trend: "+9%", perfectStreak: -4, fuelEfficiency: "78%", onTime: "91%", lastScratchie: "18 days ago", incidents: 7, 
      scratchieCarrotsWeek: 120, scratchieCarrotsMonth: 340 
    },
    { 
      id: 10, 
      name: "Aiden Nguyen",
      photoUrl: "/driver-avatars/Driver10.jpeg",
      safetyScore: 81, trend: "+10%", perfectStreak: -6, fuelEfficiency: "76%", onTime: "90%", lastScratchie: "20 days ago", incidents: 8, 
      scratchieCarrotsWeek: 130, scratchieCarrotsMonth: 360 
    },
    { 
      id: 11, 
      name: "Sophia Tran",
      photoUrl: "/driver-avatars/Driver11.jpeg",
      safetyScore: 79, trend: "+11%", perfectStreak: -8, fuelEfficiency: "74%", onTime: "89%", lastScratchie: "22 days ago", incidents: 9, 
      scratchieCarrotsWeek: 140, scratchieCarrotsMonth: 380 
    },

    // ... rest of the drivers ...
  ];
  
  export const dashboardMetrics = {
    topDriversShift: [drivers[0], drivers[2], drivers[1]],
    topDriversDay: [drivers[2], drivers[0], drivers[1]],
    topDriversWeek: [drivers[2], drivers[0], drivers[1]],
    topDriversMonth: [drivers[2], drivers[0], drivers[3]],
    topDriversYear: [drivers[2], drivers[0], drivers[1]],
    mostImproved: drivers[2],
    bottomDriver: drivers[8],
    totalCarrotsWeek: drivers.reduce((sum,d)=>sum+d.scratchieCarrotsWeek,0),
    totalCarrotsMonth: drivers.reduce((sum,d)=>sum+d.scratchieCarrotsMonth,0),
  };
  
  // Scratchie budget info (financial Scratchies)
  export const scratchieBudget = {
    monthlyScratchiesLeft: 12, // how many Scratchies with financial reward left this month
    carrotBalance: 500         // how many carrots available to give
  };
  
  export const initialAutoAwardRules = {
    weeklyTopDriver: true,
    maxAutoAwardsPerWeek: 3,
    perShiftAward: true
  };