const beatsData = [
  {
    id: "1",
    title: "Delta",
    uri:require("./music/song1.mp3"),
    image: require("../img/Sleeping.jpg"),
    frequency_gap: "0.1Hz - 4Hz",

    benefits: [

      {heading: "Deep Sleep"},
      {heading: "Pain Relief"},
     { heading: "Healing"},
    ],
    icon: "sleep",
    color: "#142B2E",
    bgColor: "#BCD5EB",
  },
  {
    id: "2",
    title: "Theta",
    uri:require("./music/song2.mp3"),
    image: require("../img/mediation.jpg"),
    frequency_gap: "4Hz - 8Hz",
    
    benefits: [

      {heading: "Meditaion"},
      {heading: "Deep Relax"},
     { heading: "Creativity"},
    ],
    icon: "meditation",
    color: "#F39F80",
    bgColor: "#A7D1E0",
  },
  {
    id: "3",
    title: "Alpha",
    uri:require("./music/song3.mp3"),
    image: require("../img/mood.jpg"),
    frequency_gap: "8Hz - 13Hz",
    
    benefits: [

      {heading: "Stress Relief"},
      {heading: "Fast Learning"},
     { heading: "Positive Thinking"},
    ],
    
    icon: "emoticon-happy-outline",
    color: "#F37557",
    bgColor: "#FFFFFF",
  },
  {
    id: "4",
    title: "Beta",
    uri:require("./music/song4.mp3"),
    image: require("../img/styding.jpg"),
    frequency_gap: "13Hz - 30Hz",
    
    benefits: [

      {heading: "Focus Studying"},
      {heading: "Problem Solving"},
     { heading: "Focused Attention"},
    ],
    icon: "user-graduate",
    color: "#FFC800",
    bgColor: "#FFFFFF",
  },
  {
    id: "5",
    title: "Gamma  ",
    uri:require("./music/song5.mp3"),
    image: require("../img/387.jpg"),
    frequency_gap: "30Hz - Above",

    
    benefits: [

      {heading: "Super Intelligence"},
      {heading: "Peak Awareness"},
     { heading: "Increase Creativity"},
    ],
    icon: "brain",
    color: "#23353F",
    bgColor: "#E6E6E6",
  },
];

export default beatsData;
