import { gsap } from 'gsap'
import Lenis from 'lenis'
import './style.css';

// Initialize Lenis
const lenis = new Lenis();

// Use requestAnimationFrame to continuously update the scroll
function raf(time) {
  lenis.raf(time);
  requestAnimationFrame(raf);
}

requestAnimationFrame(raf);




let Contaiener_main = document.querySelector('.Contaiener_main')

// Create 100 gold particles inside the .particales div with random positions
const COUNT = 5000
const container = document.querySelector('.particales');
if (container) {
    // keep the particle area visible on screen instead of pushing them far below
    container.style.height = '400rem';
    container.style.width = '100%';
    // Ensure container can hold absolutely positioned particles
    const cs = getComputedStyle(container)
    if (cs.position === 'static') container.style.position = 'relative'
}

for (let i = 0; i < COUNT; i++) {
    const p = document.createElement('div')

    p.className = 'particle'
    p.style.position = 'absolute'
    p.style.width = '2px'
    p.style.height = '2px'
    p.style.opacity = Math.random() * 0.3 + 0.2,
    p.style.backgroundColor = '#FFD700'
    p.style.borderRadius = '50%'
    p.style.left = Math.random() * 100 + '%'
    p.style.top = Math.random() * 100 + '%'
    p.style.zIndex = Math.random() * 100 + '%'
    p.style.opacity = Math.random() * 100 + '%'

    container.appendChild(p)
}

const particles = document.querySelectorAll('.particle');
if (particles) {
    particles.forEach((particle) => {
        gsap.to(particle, {
            x: () => gsap.utils.random(-100, 100),
            y: () => gsap.utils.random(-100, 100),
            duration: gsap.utils.random(4, 8),
            ease: "sine.inOut",
            repeat: -1,
            yoyo: true,
        });
    });

}

const ScrollTl = gsap.timeline({ repeat: -1, duration: 0.6 })

ScrollTl.from('.scrollAnimation', {
    y: -40,
    opacity: 0
})
ScrollTl.to('.scrollAnimation', {
    delay: 0.25,
    y: 40,
    opacity: 0
})




// list of legends card created here

const LegendsCard = [
    {
        jerseyNo: 39,
        name: 'Lionel Messi',
        paragraph: 'The last waltz ended at the the final — SPAIN. The music, finally, stopped.',
        teamResult: 'ELIMINATED · THE FINAL · BY SPAIN'
    },
    {
        jerseyNo: 41,
        name: 'CRISTIANO RONALDO',
        paragraph: 'Midnight came in stoppage time, wearing red and gold. The machine finally slept.',
        teamResult: 'FULL TIME  ·  ROUND OF 16  ·  SPAIN 1–0'
    },
    {
        jerseyNo: 40,
        name: 'LUKA MODRIĆ',
        paragraph: 'Still conducting, long after the orchestra was told to go home.',
        teamResult: ''
    },
    {
        jerseyNo: 37,
        name: 'ROBERT LEWANDOWSKI',
        paragraph: 'One summer left to make the numbers mean something more.',
        teamResult: ''
    }
];

// Create Legend Cards from array
const legendsContainer = document.querySelector('.LegendsInfo');

LegendsCard.forEach((legend) => {
    const card = document.createElement('div');
    card.className = 'legend-card flex   py-10 gap-6   ';

    card.innerHTML = `
        <div class="legend-header playfair flex items-start">
            <h1 class="jersey-no text-transparent [-webkit-text-stroke:1px_#725F25]  flex items-start  text-8xl">${legend.jerseyNo}</h1>
        </div>
        <div class='flex flex-col gap-2'>
            <h3 class="legend-name text-[#EAE5D7] uppecase playfair tracking-wider text-4xl mix-blend-hard-light">${legend.name}</h3>
            <p class="legend-paragraph text-[#6f695c] text-sm playfair italic tracking-wide">${legend.paragraph}</p>
            <div class='legend-result text-[#d4af3799] text-[14px] tracking-widest playfair  ${legend.teamResult ? 'block' : 'hidden'}'>${legend.teamResult}</div>
        </div>

        </div>
    `;

    legendsContainer.appendChild(card);
});



// list of Contenders card created here

const ContendersCard = [
    {
        Rank: 1,
        Countryname: 'SPAIN',
        paragraph: 'Champions of Europe, executioners of Portugal. The idea has become a machine.',
        teamResult: ''
    },
    {
        Rank: 2,
        Countryname: 'FRANCE',
        paragraph: 'An empire that reloads faster than history can write it down.',
        teamResult: 'ELIMINATED · SEMI-FINAL · BY SPAIN'
    },
    {
        Rank: 3,
        Countryname: 'ENGLAND',
        paragraph: 'Bellingham dragged them past Mexico. Sixty years of almost, three wins from over.',
        teamResult: 'ELIMINATED · SEMI-FINAL · BY ARGENTINA'
    },
    {
        Rank: 4,
        Countryname: 'ARGENTINA',
        paragraph: 'Two goals down to Egypt, three answers back. The crown does not slip easily.',
        teamResult: 'ELIMINATED · THE FINAL · BY SPAIN'
    },
    {
        Rank: 5,
        Countryname: 'BRAZIL',
        paragraph: 'Five stars, sent home by the north. The sixth keeps burning — somewhere else.',
        teamResult: 'ELIMINATED  ·  ROUND OF 16  ·  BY NORWAY'
    }
];

// Create Contenders Cards from array
const ContendersContainer = document.querySelector('.ContendersContainer');

ContendersCard.forEach((legend, idx) => {
    const card = document.createElement('div');
    card.className = `Contenders-card card-${idx} flex border-t border-b border-[#d4af3799]/40 bg-transparent   ${idx > 0 ? 'opacity-50' : ''}   py-10 gap-6   `;

    card.innerHTML = `
        <div class="Contenders-header playfair flex items-start">
            <h1 class="jersey-no text-transparent [-webkit-text-stroke:1px_#fff]  opacity-20 flex items-start  text-5xl">0${legend.Rank}<h1>
        </div>
        <div class='flex flex-col gap-2'>
            <h3 class="country-name-${idx} text-[#EAE5D7] uppecase playfair ${idx > 0 ? 'line-through decoration-1 decoration-[#f5cb4099]/80' : ""} font-semibold tracking-wider text-5xl mix-blend-hard-light">${legend.Countryname}</h3>
            <p class="Contenders-paragraph-${idx} text-[#6f695c] text-sm playfair italic tracking-wide">${legend.paragraph}</p>
            <div class='Contenders-result-${idx} text-[#d4af3799] text-[14px] tracking-widest playfair  ${legend.teamResult ? 'block' : 'hidden'}'>${legend.teamResult}</div>
        </div>

        </div>
    `;
    ContendersContainer.appendChild(card);

    const TopCard = document.querySelector('.card-0')
    if (idx === 0) {
    const CountryTl = gsap.timeline({ paused: true });
    const countryName = TopCard.querySelector(".country-name-0");
    const paragraph = TopCard.querySelector(".Contenders-paragraph-0");

    CountryTl
        .to(TopCard, {
            background: "linear-gradient(to right, rgba(212,175,55,0.2), transparent)",
            backgroundSize: "200% 100%",
            backgroundPosition: "0% 0",
            duration: 0.5,
            ease: "power1.out",
        })
        .to(countryName, {
             letterSpacing: "0.15em",
            duration: 0.5,
            ease: "power1.out",
            transformOrigin: "left center",
        }, "<")
        .to(paragraph, {
            color:'white',
            duration: 0.5,
            ease: "power1.out",
            transformOrigin: "left center",
        }, "<");

    TopCard.addEventListener("mouseenter", () => {
        CountryTl.play();
    });

    TopCard.addEventListener("mouseleave", () => {
        CountryTl.reverse();
    });
}
});




// list of  Underdogs card created here

const  UnderdogsCard = [
    {
        Teamname: 'SPAIN',
        paragraph: 'They buried Brazil in ninety minutes. Ask the five stars if the fjords are cold.',
    },
    {
        Teamname: 'MOROCCO',
        paragraph: '2022 was not a miracle. It was a rehearsal — and France is the encore.',
    },
    {
        Teamname: 'BELGIUM',
        paragraph: 'Four past the hosts. The uninvited empire has one more coup in it.',
    },
    {
        Teamname: 'THE LAST GHOST',
        paragraph: 'Champions of Europe, executioners of Portugal. The idea has become a machine.',
    }
];
const UnderdogsContainer = document.querySelector('.UnderdogsContainer');
UnderdogsCard.forEach((Underdog, idx) => {
    const card = document.createElement('div');
    card.className = `flex flex-col items-end  py-10 gap-3  `;

    card.innerHTML = `
        <div class="Underdogs-header playfair flex ">
            <h1 class="jersey-no font-semibold text-[#ece5d8] hover:text-[#F2D77E]  hover:bg-[#F2D77E]/2.5 ease-in flex text-5xl">${Underdog.Teamname}<h1>
        </div>
        <p class=" text-[#6f695c] text-sm playfair italic tracking-wide">${Underdog.paragraph}</p>
    `;
    UnderdogsContainer.appendChild(card);
});





// list of Contenders card created here



const hiersCard = [
    {
        Rank: 18,
        PlayerName: 'LAMINE YAMAL',
        paragraph: 'He turns 19 the week of the final. Football may never be his age again.',

    },
    {
        Rank: 19,
        PlayerName: 'ENDRICK',
        paragraph: 'Brazil does not produce forwards. It produces weather.',

    },
    {
        Rank: 23,
        PlayerName: 'JAMAL MUSIALA',
        paragraph: 'Plays in the gaps other players don’t know exist.',

    },
    {
        Rank: 22,
        PlayerName: 'JUDE BELLINGHAM',
        paragraph: 'Carries a nation’s sixty-year ache like it weighs nothing.',

    },
    {
        Rank: 23,
        PlayerName: 'FLORIAN WIRTZ',
        paragraph: 'The quiet one. The dangerous ones always are.',

    },
];

const hiersContainer=document.querySelector('.hiersContainer')

hiersCard.forEach((hier, idx) => {
    const card = document.createElement('div');
    card.className = `hiers-card w-full  card-${idx} flex border-t border-b border-[#d4af3799]/40 bg-transparent    py-10 gap-20   `;

    card.innerHTML = `
        <div class="hiers-header playfair flex items-start">
            <h1 class="jersey-no text-transparent [-webkit-text-stroke:1px_#fff]  opacity-20 flex items-start  text-5xl">${hier.Rank}<h1>
        </div>
        <div class='flex flex-col gap-2 w-full'>
            <h3 class="country-name-${idx} text-[#EAE5D7] uppecase playfair font-semibold hover:text-[#F2D77E]  hover:bg-[#F2D77E]/1 ease-in  tracking-wider text-5xl mix-blend-hard-light">${hier.PlayerName}</h3>
            <p class="hiers-paragraph-${idx} text-[#6f695c] text-sm playfair italic tracking-wide">${hier.paragraph}</p>
        </div>

        </div>
    `;
    hiersContainer.appendChild(card)
});
