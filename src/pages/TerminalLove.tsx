import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

// Type definitions
interface Command {
  (): string[];
  (args: string[]): string[];
}

interface Commands {
  [key: string]: Command;
}

// Constants
const MAX_HISTORY_LENGTH = 1000;

// Component definition
const TerminalLove: React.FC = () => {
  const navigate = useNavigate();
  const [input, setInput] = useState('');
  const [history, setHistory] = useState<string[]>([
    'Love OS Terminal v2.0',
    'Welcome to the Enhanced Terminal of Love 💕',
    'Type "help" to see all available commands',
    ''
  ]);
  const terminalRef = useRef<HTMLDivElement>(null);

  // Helper functions
  const getRandomElement = <T,>(array: T[]): T => {
    if (!array || array.length === 0) {
      throw new Error('Array is empty or undefined');
    }
    return array[Math.floor(Math.random() * array.length)];
  };

  // Command definitions
  const commands: Commands = {
    help: () => [
      'Available commands:',
      '  pickup           Generate a romantic pickup line',
      '  date             Suggest a future date idea',
      '  echo <message>   Display your message with hearts',
      '  memory           Show a random memory',
      '  fortune          Get a love fortune',
      '  clear            Clear the terminal',
      '  heart            Display ASCII heart',
      '  kiss             Send virtual kisses',
      '  hug              Virtual warm hug',
      '  compliment       Get a sweet compliment',
      '  poem             Generate a love poem',
      '  quote            Romantic quote of the day',
      '  song             Suggest a romantic song',
      '  future           Predict your romantic future',
      '  stats            Show relationship statistics',
      '  mood             Set romantic mood',
      '  weather          Love weather forecast',
      '  time             Show love time',
      ''
    ],
    pickup: () => [
      pickupLines[Math.floor(Math.random() * pickupLines.length)],
      ''
    ],
    date: () => [
      dateIdeas[Math.floor(Math.random() * dateIdeas.length)],
      ''
    ],
    memory: () => [
      memories[Math.floor(Math.random() * memories.length)],
      ''
    ],
    fortune: () => [
      fortunes[Math.floor(Math.random() * fortunes.length)],
      ''
    ],
    kiss: () => [
      kisses[Math.floor(Math.random() * kisses.length)],
      ''
    ],
    hug: () => [
      hugs[Math.floor(Math.random() * hugs.length)],
      ''
    ],
    compliment: () => [
      compliments[Math.floor(Math.random() * compliments.length)],
      ''
    ],
    poem: () => [
      poems[Math.floor(Math.random() * poems.length)],
      ''
    ],
    quote: () => [
      quotes[Math.floor(Math.random() * quotes.length)],
      ''
    ],
    song: () => [
      songs[Math.floor(Math.random() * songs.length)],
      ''
    ],
    future: () => [
      futures[Math.floor(Math.random() * futures.length)],
      ''
    ],
    stats: () => [
      '💕 Your Love Stats:',
      '  Days together: xyz',
      '  Messages sent: xyz',
      '  Calls made: xyz',
      '  Emojis shared: xyz',
      '  "I love you" count: xyz',
      '  Happiness level: Infinite 💖',
      ''
    ],
    mood: () => [
      moods[Math.floor(Math.random() * moods.length)],
      ''
    ],
    weather: () => [
      loveWeather[Math.floor(Math.random() * loveWeather.length)],
      ''
    ],
    time: () => [
      `💕 Love Time: ${new Date().toLocaleTimeString()}`,
      'Every moment with you is precious ⏰',
      ''
    ],
    clear: () => {
      setHistory(['Love OS Terminal v2.0', 'Welcome to the Enhanced Terminal of Love 💕', '']);
      return [];
    },
    heart: () => [
  '  ♥♥♥     ♥♥♥  ',
  ' ♥♥♥♥♥   ♥♥♥♥♥ ',
  '♥♥♥♥♥♥♥ ♥♥♥♥♥♥♥',
  '♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥',
  ' ♥♥♥♥♥♥♥♥♥♥♥♥♥ ',
  '  ♥♥♥♥♥♥♥♥♥♥♥  ',
  '   ♥♥♥♥♥♥♥♥♥   ',
  '    ♥♥♥♥♥♥♥    ',
  '     ♥♥♥♥♥     ',
  '      ♥♥♥      ',
  '       ♥       ',
  ''
]

  };

  // Data arrays
  // Organized collections of romantic content
  const pickupLines = [
    "Are you WiFi? Because I'm feeling a connection 💕",
    "Do you have a map? I keep getting lost in your eyes 🗺️",
    "Are you a magician? Every time I look at you, everyone else disappears ✨",
    "If you were a vegetable, you'd be a cute-cumber 🥒",
    "Do you believe in love at first sight, or should I walk by again? 👀",
    "Are you a parking ticket? Because you've got 'fine' written all over you 🚗",
    "Is your name Google? Because you have everything I've been searching for 🔍",
    "Are you made of copper and tellurium? Because you're Cu-Te ⚗️",
    "Do you have a Band-Aid? I just scraped my knee falling for you 🩹",
    "Are you a campfire? Because you're hot and I want s'more 🔥",
    "If you were a triangle, you'd be acute one 📐",
    "Are you a loan from a bank? Because you have my interest 💰",
    "Is your dad a boxer? Because you're a knockout! 🥊",
    "Are you a time traveler? Because I see you in my future ⏰",
    "Do you have a sunburn, or are you always this hot? ☀️",
    "Are you a camera? Because every time I look at you, I smile 📸",
    "If you were a fruit, you'd be a fine-apple 🍍",
    "Are you an interior decorator? Because when I saw you, the entire room became beautiful 🏠",
    "Do you have a name, or can I call you mine? 💖",
    "Are you a tower? Because Eiffel for you 🗼",
    "Is your name Ariel? Because we mermaid for each other 🧜‍♀️",
    "Are you a keyboard? Because you're just my type ⌨️",
    "Do you work at Starbucks? Because I like you a latte ☕",
    "Are you my phone charger? Because without you, I'd die 🔋",
    "If you were a Pokemon, I'd choose you! ⚡"
];


  const dateIdeas = [
  "🌅 Watch the sunrise together with hot coffee",
  "🎨 Take a pottery class and make something together",
  "🌟 Go stargazing in a field with blankets and snacks",
  "🍳 Cook a fancy dinner together at home",
  "📚 Visit a bookstore and pick books for each other",
  "🌸 Have a picnic in a beautiful garden",
  "🎭 Attend a local theater performance",
  "🏛️ Explore a museum and discuss the art",
  "🚲 Rent bicycles and explore a scenic trail",
  "🍿 Set up an outdoor movie night with a projector",
  "🧺 Do a themed potluck at home (Italian night, brunch, etc.)",
  "🖼️ Create a mini art gallery at home and paint together",
  "🧭 Take a spontaneous day trip to a nearby town",
  "🧩 Work on a 1000-piece puzzle with music",
  "☕ Go café-hopping and rate each drink together",
  "🌮 Try cooking a new cuisine from scratch",
  "🎧 Make and swap personalized playlists",
  "🌧️ Cozy rainy-day walk with shared umbrella and chai",
  "🌿 Volunteer at a local shelter or community garden",
  "🕯️ Candlelit rooftop dinner with homemade desserts",
  "🎳 Bowling night with playful challenges",
  "🧗 Try a climbing wall or an adventure park",
  "🛶 Go boating or paddle on a calm lake",
  "📸 Do a photo walk and capture each other’s best angles",
  "🍨 Ice-cream crawl: sample 3–4 spots and pick a winner",
  "🪴 Visit a plant nursery and pick a plant to grow together",
  "🧘 Couple’s yoga or meditation session at sunrise",
  "📖 Poetry night: read or write short verses together",
  "🎤 Karaoke at home with a simple mic setup",
  "🔭 Visit a planetarium or set a telescope night",
  "🪁 Fly kites at a windy open ground",
  "🥟 Street food trail and rate each stop",
  "🕌 Heritage walk and local history quiz",
  "🔥 Bonfire evening with stories and roasted corn",
  "🚂 Scenic train ride and window-seat talks",
  "🎮 Co-op video game marathon with snacks",
  "🧁 Bake-off challenge with a surprise ingredient",
  "🧖 DIY spa night with face masks and foot soaks",
  "🏸 Badminton match at a nearby park",
  "🌾 Sunset field walk with a shared playlist"
];


const memories = [
  "💕 Remember when we first held hands? My heart skipped a beat",
  "🌧️ That rainy day when we danced in the living room",
  "☕ Our first coffee date where we talked for hours",
  "🌅 The morning you made me breakfast in bed",
  "🎵 When we sang our favorite song in the car together",
  "📱 Our first 'good morning' text that made me smile all day",
  "🍲 The day we shared one plate and it tasted better together",
  "🌠 That night we wished on the same shooting star",
  "📸 When we took that blurry selfie and still loved it",
  "🚲 Our sunset bike ride where the wind felt like a hug",
  "🎬 The movie night where we forgot the film and just talked",
  "📝 The little note you left that I still keep",
  "🌸 When you tucked that flower behind my ear",
  "🧣 The way you wrapped your scarf around me in the cold",
  "🎂 Your birthday surprise and the frosting on our noses",
  "🌉 That long walk over the bridge, hand in hand",
  "🍦 Sharing a melting ice cream and laughing at the mess",
  "🕯️ The candlelit evening when time felt slower",
  "🌧️ Sipping chai by the window while the rain sang",
  "🧭 Getting lost together and finding our favorite corner",
  "🎡 The ferris wheel moment when the city lights looked jealous",
  "📚 Studying together and turning pages in sync",
  "🎧 Swapping earphones on the bus and smiling at the lyrics",
  "🌇 Chasing the last light of the day on the rooftop",
  "💌 The first letter you wrote that I’ve read a hundred times",
  "🌿 The quiet park bench where everything felt right",
  "🍁 That autumn path we walked through crunchy leaves",
  "💬 The late-night call that made morning come too soon",
  "🥰 The hug that felt like home after a long day",
  "⭐ The moment we realized this was more than a moment"
];

const fortunes = [
  "💖 Your love story is just beginning - the best chapters are yet to come",
  "🌟 A surprise romantic gesture is heading your way soon",
  "💕 Your relationship will grow stronger with each passing day",
  "🌹 Love will bloom in unexpected ways this month",
  "💫 Your bond is unbreakable and will inspire others",
  "🌈 A small act of kindness today will open a big door in love",
  "🕊️ Peace and clarity are arriving for your heart",
  "✨ The universe is aligning to bring you closer than ever",
  "🍃 A fresh start will make old feelings feel new again",
  "🎁 Expect a heartfelt message that warms your soul",
  "🌙 Late-night conversations will deepen your connection",
  "🔥 Sparks will fly when honesty leads the way",
  "🌻 Gratitude will turn your love into daily sunshine",
  "📖 A shared memory will become your favorite story",
  "🎶 A song you hear soon will become ‘your’ song",
  "🧭 Trust your heart—it already knows the way",
  "🌊 Gentle waves of affection are coming your way",
  "🧡 Patience now will bring a beautiful reward",
  "🔑 Vulnerability will unlock a new level of closeness",
  "🌟 Your wishes are closer than they appear—keep believing"
];

const kisses = [
  "💋 Sending you a thousand virtual kisses!",
  "😘 *smooch* - that one's extra special",
  "💋💋💋 Triple kiss combo for my favorite person!",
  "😙 A gentle kiss on your forehead 💕",
  "💋 Kiss delivery complete! Hope it made you smile ✨",
  "😚 One sweet kiss for every reason I adore you",
  "💞 Sealed with a kiss and a little bit of magic",
  "💘 Air-kiss express—arriving in 3...2...1!",
  "💋✨ A glittery kiss to brighten your day",
  "🥰 Soft kisses sprinkled between every hug",
  "💌 Special delivery: a kiss tucked inside a love note",
  "🌙 Goodnight kiss drifting to you on moonlight",
  "🌹 A rose and a kiss—classic combo just for you",
  "🎯 Aimed a kiss at your heart—bullseye!",
  "🍓 Strawberry-sweet kiss, just because",
  "🫶 Sending butterfly kisses to your cheeks",
  "🎈 A floating balloon carrying a kiss your way",
  "☀️ Morning kiss with a side of sunshine",
  "🌧️ Rainy-day kisses under one umbrella",
  "⭐ Starry-night kiss, make a wish"
];

const hugs = [
  "🤗 *big warm hug* - you're never alone when you have me",
  "🫂 Sending you the coziest virtual hug ever!",
  "🤗 *squeezes tight* - this hug comes with extra love",
  "🫂 Here's a hug that lasts as long as you need it 💕",
  "🤗 *bear hug* - because you deserve all the comfort",
  "🧣 Wrapping you in a blanket of hugs and calm",
  "🌙 Night-time hug to keep the worries away",
  "☀️ Morning hug to start the day with courage",
  "💞 A gentle hug, just enough to make you feel safe",
  "🌧️ Rainy-day hug with hot chai and soft silence",
  "🛡️ Protective hug mode: ON",
  "🫶 Pocket-sized hug—keep it with you all day",
  "🏡 A home-shaped hug for heart-shaped comfort",
  "💖 Hugging your heart till it feels lighter",
  "🧸 Soft teddy hug for when words aren’t enough",
  "🌈 Sending a hug with hope tucked inside",
  "🫧 Bubble-wrap hug—pop the stress away",
  "🎧 Quiet hug with our favorite song on loop",
  "🌿 Slow, steady hug—breathe in, breathe out",
  "⭐ Starlit hug for brave souls on tough nights"
];

const compliments = [
  "✨ You have the most beautiful smile that lights up my world",
  "💫 Your laugh is my favorite sound in the universe",
  "🌟 You make ordinary moments feel magical",
  "💖 Your kindness makes you absolutely radiant",
  "🌙 You're the most amazing person I've ever met",
  "💕 Your presence makes everything better",
  "🌸 Your heart is as lovely as your face",
  "🌈 You bring color to my grayscale days",
  "☀️ You’re sunshine with perfect timing",
  "🌌 Talking to you feels like a sky full of stars",
  "🧠 Your mind is brilliant—and so inspiring",
  "🍃 You have a calm that makes everything feel okay",
  "🎨 You make life look like art",
  "🌻 You make people bloom just by being around",
  "🎶 Your voice feels like my favorite song",
  "🪞 Even mirrors get shy around your glow",
  "💬 Every word you say feels like a little gift",
  "🧲 Your energy is magnetic in the best way",
  "🌙 You’re the soft moonlight on a tough night",
  "🏆 You’re effortlessly impressive—no try-hard needed",
  "📸 Even candid moments look perfect with you in them",
  "🕊️ Your kindness makes the world feel gentler",
  "🌿 You’re growth, grace, and good vibes in one",
  "💎 Rare, real, and radiant—that’s you",
  "🔥 Somehow you’re calm and captivating at once",
  "🧩 Everything fits better when you’re here",
  "✨ You don’t try to shine—you just do",
  "🌊 You’re the peace after a long day",
  "🌟 You’re the reason little moments feel big",
  "💞 Being around you feels like a warm hug"
];

const poems = [
  "🌹 Roses are red, violets are blue,\n    No poem could capture how much I love you 💕",
  "✨ In your eyes I see the stars,\n    In your smile I find my peace,\n    With you, my love never departs,\n    And my happiness will never cease 🌟",
  "💫 You are my sunshine on cloudy days,\n    My anchor in stormy weather,\n    Through all of life's mysterious ways,\n    We'll always be together 🌈",
  "🌙 Under moonlit, quiet skies,\n    Your name glows soft and true,\n    Every wish behind my eyes\n    Finds its way to you ✨",
  "🌼 Little moments, gentle light,\n    Fingers laced, a slowing time,\n    In your warmth the world feels right—\n    Every heartbeat rhymes 💞",
  "🔥 When doubt is loud and shadows creep,\n    Your voice becomes my brighter flame,\n    You hold my storms, you guard my sleep—\n    Love signs its fearless name 🕊️",
  "☀️ Morning spills on window panes,\n    Hope wakes up where you have been,\n    Coffee laughs and sugar rain—\n    Home begins within 💖",
  "🌧️ Raindrops drum a soft duet,\n    On the roof we hum along,\n    Every puddle, silver-set,\n    Mirrors how we’re strong 🎶",
  "🌊 Tides may pull and seasons turn,\n    Maps may blur and pathways bend,\n    What we keep is what we learn—\n    You: my start and end 🧭",
  "🌸 Petals fall and gardens grow,\n    Time will write its golden hue,\n    Through each chapter, this I know—\n    I choose, and choose, and choose you 💗"
];

const quotes = [
  "💕 'Love is not about how many days, months, or years you have been together. Love is about how much you love each other every single day.'",
  "🌟 'In all the world, there is no heart for me like yours. In all the world, there is no love for you like mine.'",
  "💖 'You are my today and all of my tomorrows.' - Leo Christopher",
  "✨ 'I love you not only for what you are, but for what I am when I am with you.'",
  "🌙 'With you, ordinary minutes turn into forever memories.'",
  "🌸 'Your smile is the quiet sunrise my heart waits for.'",
  "🕊️ 'Love speaks softly but changes everything.'",
  "🌈 'Two hearts, one shelter—no storm can scare us.'",
  "💫 'Every day with you feels like a wish coming true.'",
  "🔥 'Love is the courage to be our truest selves together.'",
  "🌿 'Gentle hands, brave hearts—that’s our kind of love.'",
  "⭐ 'You are the reason the small moments feel big.'",
  "☀️ 'Your presence is proof that light keeps finding me.'",
  "🍃 'In a noisy world, your love is my quiet place.'",
  "🎶 'Our laughter is the song I never want to end.'",
  "🔗 'Real love is not perfect; it’s patient, kind, and consistent.'",
  "🧭 'No matter the map, I end up where you are.'",
  "📖 'If love is a story, I’m grateful for every page with you.'",
  "🌌 'Under any sky, your hand is my home.'",
  "💞 'You make me believe that ordinary love is the most extraordinary thing.'"
];

const songs = [
  "🎵 'Perfect' by Ed Sheeran - because you're perfect to me",
  "🎶 'All of Me' by John Legend - you have all of my heart",
  "🎵 'Thinking Out Loud' by Ed Sheeran - for those quiet moments",
  "🎶 'Make You Feel My Love' by Adele - pure emotion",
  "🎵 'Better Days' by OneRepublic - for our bright future together",
  "🎶 'Yellow' by Coldplay - you shine brighter than the stars",
  "🎵 'Just the Way You Are' by Bruno Mars - you're amazing, just as you are",
  "🎶 'Love Story' by Taylor Swift - timeless fairytale vibes",
  "🎵 'Until I Found You' by Stephen Sanchez - vintage romance feel",
  "🎶 'Best Part' by Daniel Caesar ft. H.E.R. - you’re the best part of my day",
  "🎵 'Perfect Duet' by Ed Sheeran & Beyoncé - two hearts, one song",
  "🎶 'Everything' by Michael Bublé - you’re my everything",
  "🎵 'Photograph' by Ed Sheeran - keeping memories close",
  "🎶 'Peaches' by Justin Bieber - sweet and sunny love",
  "🎵 'A Thousand Years' by Christina Perri - forever kind of love",
  "🎶 'I Like Me Better' by Lauv - better together",
  "🎵 'Dandelions' by Ruth B. - wish-upon-a-love song",
  "🎶 'Dil Diyan Gallan' by Atif Aslam - soft, heartfelt promise",
  "🎵 'Raabta' by Arijit Singh - feels like destiny",
  "🎶 'Kesariya' by Arijit Singh - warm, glowing romance",
  "🎵 'I Won’t Give Up' by Jason Mraz - steady love",
  "🎶 'Lucky' by Jason Mraz & Colbie Caillat - love and friendship",
  "🎵 'Can’t Help Falling in Love' by Elvis Presley - classic devotion",
  "🎶 'Say You Won’t Let Go' by James Arthur - life-long promise",
  "🎵 'Heaven' by Bryan Adams - love that feels like home",
  "🎶 'Until I Found You (Em Beihold)' - sweeter as a duet",
  "🎵 'Hawayein' by Arijit Singh - love in every breeze",
  "🎶 'Tera Ban Jaunga' by Akhil Sachdeva & Tulsi Kumar - unwavering vow",
  "🎵 'Night Changes' by One Direction - growing together",
  "🎶 'Lovely' by Billie Eilish & Khalid - finding light together"
];

  const futures = [
    "🔮 I see many adventures in your future, hand in hand with your soulmate",
    "✨ The universe is aligning to bring you even more love and happiness",
    "🌟 Your love story will inspire others and create ripples of joy",
    "💫 Many beautiful sunrises await you two lovebirds",
    "🎭 Plot twist: your love story gets even more amazing from here!"
  ];

  const moods = [
    "🌸 Setting mood to: Romantic Spring Garden 🌷",
    "🌙 Mood activated: Moonlit Serenade 🎶",
    "🔥 Current vibe: Passionate and Playful 💃",
    "☁️ Mood set to: Dreamy Cloud Nine ☁️",
    "🌅 Ambiance: Golden Hour Romance 🧡"
  ];

  const loveWeather = [
    "💕 Love forecast: 100% chance of butterflies with scattered heart showers",
    "🌈 Romantic weather: Sunny with a high chance of hand-holding",
    "✨ Love conditions: Perfect cuddling weather with warm fuzzy feelings",
    "🌟 Romance report: Clear skies ahead with unlimited happiness",
    "💖 Weather update: Heart-warming temperatures with gentle love breezes"
  ];

  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [history]);

  useEffect(() => {
    const scrollToBottom = () => {
      if (terminalRef.current) {
        const { scrollHeight, clientHeight } = terminalRef.current;
        terminalRef.current.scrollTo({
          top: scrollHeight - clientHeight,
          behavior: 'smooth'
        });
      }
    };

    const timeoutId = setTimeout(scrollToBottom, 100);
    return () => clearTimeout(timeoutId);
  }, [history]);

  // Command execution logic
  const executeCommand = (cmd: string) => {
    const [command, ...args] = cmd.trim().toLowerCase().split(' ');
    
    if (command === 'echo') {
      const message = args.join(' ');
      return [`💕 ${message} 💕`, ''];
    }
    
    if (commands[command]) {
      const cmdFunc = commands[command];
      try {
        return cmdFunc(args);
      } catch {
        return cmdFunc();
      }
    }
    
    return [`Command not found: ${cmd}`, 'Type "help" for available commands', ''];
  };

  // Event handlers
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const newHistory = [...history, `$ ${input}`];
    
    if (input.trim().toLowerCase() === 'clear') {
      executeCommand(input);
      setInput('');
      return;
    }
    
    const output = executeCommand(input);
    const updatedHistory = [...newHistory, ...output]
      .slice(-MAX_HISTORY_LENGTH); // Keep history size manageable
    setHistory(updatedHistory);
    setInput('');
  };

  // Render
  return (
    <div className="min-h-screen bg-gray-900 text-green-400 font-mono">
      {/* Terminal header */}
      <div className="container mx-auto p-4">
        {/* Navigation and title */}
        <div className="flex items-center justify-between mb-4">
          <button
            onClick={() => navigate('/')}
            className="bg-love-500 hover:bg-love-600 text-white px-4 py-2 rounded font-sans transition-all duration-300"
          >
            ← Back to Love OS
          </button>
          <h1 className="text-xl font-bold text-love-400 font-sans">
            💻 Enhanced Terminal of Love
          </h1>
          <div></div>
        </div>

        {/* Terminal window */}
        <div 
          ref={terminalRef}
          className="bg-black rounded-lg p-4 h-96 overflow-y-auto mb-4 border border-green-600"
        >
          {/* Command history */}
          {history.map((line, index) => (
            <div key={index} className="mb-1 whitespace-pre-line">
              {line}
            </div>
          ))}
          
          {/* Command input */}
          <form onSubmit={handleSubmit} className="flex items-center">
            <span className="text-love-400 mr-2">$</span>
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="bg-transparent outline-none flex-1 text-green-400"
              placeholder="Enter command..."
              autoFocus
            />
          </form>
        </div>

        {/* Quick commands section */}
        <div className="bg-gray-800 rounded-lg p-4 text-sm">
          <h3 className="text-love-400 font-bold mb-2">Quick Commands:</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-2 text-green-300">
            {['pickup', 'kiss', 'hug', 'compliment', 'poem', 'quote', 'song', 'fortune', 'stats', 'mood', 'weather', 'heart'].map((cmd) => (
              <button
                key={cmd}
                onClick={() => setInput(cmd)}
                className="text-left hover:text-love-400 transition-colors text-xs py-1"
              >
                {cmd}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TerminalLove;
