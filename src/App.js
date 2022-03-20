import React, { useEffect } from "react";
import _ from "lodash";
import moment from "moment";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import {
  amber,
  blue,
  indigo,
  lightGreen,
  pink,
  purple,
  deepPurple,
  red,
} from "@mui/material/colors";
import create from "zustand";

import Checklist from "./Checklist";
import Events from "./Events";
import Arbitrage from "./Arbitrage";

import logo from "./logo.svg";
// import "./App.css";

const defaultValues = {
  siteSettings: {
    tabValue: 0,
    dailyTasksOpen: false,
    accountDailiesOpen: false,
    weeklyTasksOpen: false,
    weeklyVendorsOpen: false,
  },
  dailies: {
    una1: false,
    una2: false,
    una3: false,
    chaos1: false,
    chaos2: false,
    guardian1: false,
    guardian2: false,
    kalthertz: false,
    guildDonation: false,
  },
  weeklies: {
    una1: false,
    una2: false,
    una3: false,
    guardian1: false,
    guardian2: false,
    guardian3: false,
    abyssdemonbeastcanyon: false,
    abyssnecromancer: false,
    abysstwistedwarlord: false,
    abysshildebrandt: false,
    abyssroadofsorrow: false,
    abyssforgottenforge: false,
    abyssoblivionsea: false,
    abyssperilousabyss: false,
    abyssunderwatersanctuary: false,
    abyssdistraughtforest: false,
    abyssrottingglade: false,
    abyssraidargos: false,
    ghostship1: false,
  },
  weeklyVendors: {
    vendorGuild: false,
    vendorPirate: false,
    vendorRift: false,
    vendorChaos: false,
  },
  rosterStatus: {
    grandprix: false,
    adv: false,
    cal: false,
    chaosgate: false,
    anguishedisle: false,
    rapportsong1: false,
    rapportsong2: false,
    rapportsong3: false,
    rapportsong4: false,
    rapportsong5: false,
    rapportsong6: false,
    rapportemote1: false,
    rapportemote2: false,
    rapportemote3: false,
    rapportemote4: false,
    rapportemote5: false,
    rapportemote6: false,
  },
};

const useStore = create((set, get) => ({
  toggleSiteSetting: (id) => {
    set((state) => ({
      siteSettings: {
        ...state.siteSettings,
        [id]: !state.siteSettings[id],
      },
    }));
    localStorage.setItem("siteSettings", JSON.stringify(get().siteSettings));
  },
  resetDailyTasks: () => {
    set((state) => ({
      taskStatus: state.taskStatus.map((item) => ({
        ...item,
        dailies: defaultValues.dailies,
      })),
      rosterStatus: defaultValues.rosterStatus,
    }));
    localStorage.setItem("taskStatus", JSON.stringify(get().taskStatus));
    localStorage.setItem("rosterStatus", JSON.stringify(get().rosterStatus));
  },
  resetWeeklyTasks: () => {
    set((state) => ({
      taskStatus: state.taskStatus.map((item) => ({
        ...item,
        weeklies: defaultValues.weeklies,
        weeklyVendors: defaultValues.weeklyVendors,
      })),
    }));
    localStorage.setItem("taskStatus", JSON.stringify(get().taskStatus));
    localStorage.setItem("rosterStatus", JSON.stringify(get().rosterStatus));
  },
  setTabValue: (value) =>
    set((state) => ({
      siteSettings: {
        ...state.siteSettings,
        tabValue: value,
      },
    })),
  toggleAccountDaily: (id) => {
    set((state) => ({
      rosterStatus: {
        ...state.rosterStatus,
        [id]: !state.rosterStatus[id],
      },
    }));
    localStorage.setItem("taskStatus", JSON.stringify(get().taskStatus));
    localStorage.setItem("rosterStatus", JSON.stringify(get().rosterStatus));
  },
  toggleDailyStatus: (task, id) => {
    set((state) => ({
      taskStatus: state.taskStatus.map((item) =>
        item.id === id
          ? {
              ...item,
              dailies: {
                ...item.dailies,
                [task]: !item.dailies[task],
              },
            }
          : item
      ),
    }));
    localStorage.setItem("taskStatus", JSON.stringify(get().taskStatus));
    localStorage.setItem("rosterStatus", JSON.stringify(get().rosterStatus));
  },
  toggleWeeklyStatus: (task, id) => {
    set((state) => ({
      taskStatus: state.taskStatus.map((item) =>
        item.id === id
          ? {
              ...item,
              weeklies: {
                ...item.weeklies,
                [task]: !item.weeklies[task],
              },
            }
          : item
      ),
    }));
    localStorage.setItem("taskStatus", JSON.stringify(get().taskStatus));
    localStorage.setItem("rosterStatus", JSON.stringify(get().rosterStatus));
  },
  toggleWeeklyVendorStatus: (task, id) => {
    set((state) => ({
      taskStatus: state.taskStatus.map((item) =>
        item.id === id
          ? {
              ...item,
              weeklyVendors: {
                ...item.weeklyVendors,
                [task]: !item.weeklyVendors[task],
              },
            }
          : item
      ),
    }));
    localStorage.setItem("taskStatus", JSON.stringify(get().taskStatus));
    localStorage.setItem("rosterStatus", JSON.stringify(get().rosterStatus));
  },
  updateSiteSettings: (siteSettings) => {
    set((state) => ({ siteSettings }));
  },
  updateRS: (rosterStatus) => set((state) => ({ rosterStatus })),
  updateTS: (taskStatus) => set((state) => ({ taskStatus })),
  updateClass: (id, charclass) => {
    set((state) => ({
      taskStatus: state.taskStatus.map((item) =>
        item.id === id
          ? {
              ...item,
              class: charclass,
            }
          : item
      ),
    }));
    localStorage.setItem("taskStatus", JSON.stringify(get().taskStatus));
  },
  updateName: (id, name) =>
    set((state) => ({
      taskStatus: state.taskStatus.map((item) =>
        item.id === id
          ? {
              ...item,
              name,
            }
          : item
      ),
    })),
  siteSettings: defaultValues.siteSettings,
  taskStatus: [
    {
      id: 0,
      name: "",
      class: "",
      dailies: defaultValues.dailies,
      weeklies: defaultValues.weeklies,
      weeklyVendors: defaultValues.weeklyVendors,
    },
    {
      id: 1,
      name: "",
      class: "",
      dailies: defaultValues.dailies,
      weeklies: defaultValues.weeklies,
      weeklyVendors: defaultValues.weeklyVendors,
    },
    {
      id: 2,
      name: "",
      class: "",
      dailies: defaultValues.dailies,
      weeklies: defaultValues.weeklies,
      weeklyVendors: defaultValues.weeklyVendors,
    },
    {
      id: 3,
      name: "",
      class: "",
      dailies: defaultValues.dailies,
      weeklies: defaultValues.weeklies,
      weeklyVendors: defaultValues.weeklyVendors,
    },
    {
      id: 4,
      name: "",
      class: "",
      dailies: defaultValues.dailies,
      weeklies: defaultValues.weeklies,
      weeklyVendors: defaultValues.weeklyVendors,
    },
    {
      id: 5,
      name: "",
      class: "",
      dailies: defaultValues.dailies,
      weeklies: defaultValues.weeklies,
      weeklyVendors: defaultValues.weeklyVendors,
    },
  ],
  rosterStatus: defaultValues.rosterStatus,
}));

const defaultGoldPrices = {
  crystal: 598, // per 95
  royal: 596, // per 238 royal
  destructionStoneFragment: 6,
  destructionStone: 7,
  destructionStoneCrystal: 131,
  guardianStoneFragment: 4,
  guardianStone: 15,
  guardianStoneCrystal: 68,
  harmonyLeapstone: 15,
  lifeLeapstone: 125,
  honorLeapstone: 224,
  starsBreath: 23,
  moonsBreath: 75,
  solarGrace: 69,
  solarBlessing: 240,
  solarProtection: 600,
  healingBattleChest: 29, // Elemental HP Potion taken from chest
  buffBattleChestAwakening: 29,
  t2gem: 18,
  t3gem: 85,
};

const arbitrageStore = create((set, get) => ({
  goldValues: {
    ...defaultGoldPrices,
  },
  setPrice: (event) => {
    // console.log(event.target.id);
    set((state) => ({
      goldValues: {
        ...state.goldValues,
        [event.target.id]: event.target.value,
      },
    }));
    localStorage.setItem("goldValues", JSON.stringify(get().goldValues));
  },
  updateGV: (goldValues) => set((state) => ({ goldValues })),
}));

const defaultEventSettings = {
  filter: {
    fever: {
      grandprix: true,
    },
    adventure: {
      asura: true,
      drumbeat: true,
      forpe: true,
      harmony: true,
      harmony_sat: true,
      lagoon: true,
      lushreed: true,
      medeia: true,
      monte: true,
      monte_sat: true,
      oblivion: true,
      opportunity: true,
      phantomwing: true,
      phantomwing_sat: true,
      snowpang: true,
      tranquil: true,
      tranquil_sat: true,
      volare: true,
    },
    chaos: {
      chaos_phantom_302: true,
      chaos_darkness_302: true,
      chaos_chaos_302: true,
      chaos_plague_302: true,
      chaos_phantom_460: true,
      chaos_plague_802: true,
      chaos_darkness_960: true,
      chaos_chaos_1302: true,
    },
    fieldboss: {
      ancheladus: true,
      aurion: true,
      brealeos: true,
      chaoticchuo: true,
      harvestlordincarnate: true,
      kohinorr: true,
      magmadon: true,
      moake: true,
      proxima: true,
      tarsila: true,
      signatus: true,
      solgrande: true,
    },
    ghostship: {
      ghostship_460: true,
      ghostship_960: true,
      ghostship_1370: true,
    },
    islands: {
      alakkir: true,
      deathshold: true,
      erasmo: true,
      gesbroy: true,
      illusion: true,
      lullaby: true,
      shangra: true,
      spida: true,
      tooki: true,
      unknown: true,
    },
    sailing: {
      sailingcoop_harmony_wed: true,
      sailingcoop_vern_wed: true,
      sailingcoop_arthetine_wed: true,
      sailingcoop_anikka_302: true,
      sailingcoop_arthetine_thu: true,
      sailingcoop_anikka_thu: true,
      sailingcoop_vern_thu: true,
      sailingcoop_rohendel_thu: true,
      sailingcoop_feiton_thu: true,
      sailingcoop_punika_thu: true,
      sailingcoop_arthetine_fri: true,
      sailingcoop_anikka_fri: true,
      sailingcoop_vern_fri: true,
      sailingcoop_rohendel_fri: true,
      sailingcoop_yorn_fri: true,
      sailingcoop_feiton_fri: true,
      sailingcoop_arthetine_sat: true,
      sailingcoop_anikka_sat: true,
      sailingcoop_vern_sat: true,
      sailingcoop_harmony_sat: true,
      sailingcoop_rohendel_sat: true,
      sailingcoop_wisdom_sat: true,
      sailingcoop_yorn_sat: true,
      sailingcoop_earth_sat: true,
      sailingcoop_endurance_sat: true,
      sailingcoop_feiton_sat: true,
      sailingcoop_guidance_sat: true,
    },
    pvp: {
      coopbattle: true,
    },
  },
  offset: 0, // misc
  timezone: 0, // East = 0 (UTC - 4 (- 0))
};

const eventsStore = create((set, get) => ({
  currentDay: moment().utc().subtract(4, "hours").day(),
  currentTime: moment().utc().subtract(4, "hours").format("HH:mm:ss"),
  eventList: [],
  eventSettings: defaultEventSettings,
  favorites: [],
  setCurrentTime: (currentTime) => {
    set((state) => ({ currentTime }));
  },
  setCurrentDay: (currentDay) => {
    set((state) => ({ currentDay }));
  },
  setEventList: (eventList) => {
    set((state) => ({ eventList }));
  },
  toggleFilter: (selectedCategory, selectedId) => {
    set((state) => ({
      eventSettings: {
        ...state.eventSettings,
        filter: _.set(
          state.eventSettings.filter,
          `${selectedCategory}.${selectedId}`,
          !state.eventSettings["filter"][selectedCategory][selectedId]
        ),
      },
    }));
    localStorage.setItem("eventSettings", JSON.stringify(get().eventSettings));
  },
  setOffset: (offset) => {
    set((state) => ({
      eventSettings: {
        ...state.eventSettings,
        offset,
      },
    }));
    localStorage.setItem("eventSettings", JSON.stringify(get().eventSettings));
  },
  setTimezone: (timezone) => {
    set((state) => ({
      eventSettings: {
        ...state.eventSettings,
        timezone,
      },
    }));
    localStorage.setItem("eventSettings", JSON.stringify(get().eventSettings));
  },
  updateES: (eventSettings) => set((state) => ({ eventSettings })),
}));

const theme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#90caf9",
      success: "#4ade80",
    },
    secondary: {
      main: "#f48fb1",
    },
    background: {
      default: "#212121",
      paper: "#424242",
    },
    una: {
      main: lightGreen[500],
    },
    unaW: {
      main: indigo["A100"],
    },
    chaos: {
      main: amber[500],
    },
    guardian: {
      main: red[300],
    },
    adventure: {
      main: purple[200],
    },
    boss: {
      main: red["A700"],
    },
    chaosGate: {
      main: deepPurple["A100"],
    },
    ghost: {
      main: deepPurple[200],
    },
    rapport: {
      main: pink[200],
    },
    abyssD: {
      main: blue[200],
    },
    abyssR: {
      main: blue[400],
    },
  },
});

// function saveLocalStorage() {
//   const taskStatus = useStore((state) => state.taskStatus);
//   const rosterStatus = useStore((state) => state.rosterStatus);
//   localStorage.setItem("taskStatus", JSON.stringify(taskStatus));
//   localStorage.setItem("rosterStatus", JSON.stringify(rosterStatus));
// }

function App() {
  const updateRS = useStore((state) => state.updateRS);
  const updateTS = useStore((state) => state.updateTS);
  const updateGV = arbitrageStore((state) => state.updateGV);
  const updateES = eventsStore((state) => state.updateES);
  // const setTabValue = useStore((state) => state.setTabValue);
  // const siteSettings = useStore((state) => state.siteSettings);
  const updateSiteSettings = useStore((state) => state.updateSiteSettings);

  const localSiteSettings = localStorage.getItem("siteSettings");
  const localTaskStatus = localStorage.getItem("taskStatus");
  const parsedLocalTasks = JSON.parse(localTaskStatus);
  const localRosterStatus = localStorage.getItem("rosterStatus");
  const localGoldValues = localStorage.getItem("goldValues");
  const localEventSettings = localStorage.getItem("eventSettings");

  if (localSiteSettings) {
    updateSiteSettings(JSON.parse(localSiteSettings));
  }
  if (localTaskStatus) {
    if (_.has(parsedLocalTasks[0], "weeklyVendors")) {
      updateTS(parsedLocalTasks);
    } else {
      _.each(parsedLocalTasks, (char) => {
        char.weeklyVendors = defaultValues.weeklyVendors;
      });
      updateTS(parsedLocalTasks);
    }
  }
  if (localRosterStatus) {
    updateRS(JSON.parse(localRosterStatus));
  }
  if (localGoldValues) {
    updateGV(JSON.parse(localGoldValues));
  }
  if (localEventSettings) {
    const parsedSettings = JSON.parse(localEventSettings);
    const updatedSettings = { ...defaultEventSettings };
    _.each(parsedSettings.filter, (categoryObj, categoryName) => {
      _.each(categoryObj, (value, index) => {
        updatedSettings["filter"][categoryName][index] = value;
      });
    });
    if (parsedSettings.timezone) {
      updatedSettings.timezone = parsedSettings.timezone;
    }
    updateES(updatedSettings);
  }

  // console.log(JSON.parse(localTaskStatus), JSON.parse(localRosterStatus));

  const TabPanel = (props) => {
    const { children, value, index, ...other } = props;

    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`tabpanel-${index}`}
        aria-labelledby={`tab-${index}`}
        {...other}
      >
        {value === index && (
          <Paper
            variant="outlined"
            sx={{ my: { xs: 2, md: 4 }, p: { xs: 1, md: 3 } }}
          >
            {children}
          </Paper>
        )}
      </div>
    );
  };

  function tabProps(index) {
    return {
      id: `tab-${index}`,
      "aria-controls": `tabpanel-${index}`,
    };
  }

  const [tabValue, setTabValue] = React.useState(0);

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container component="main" sx={{ my: 0 }} maxWidth="xl">
        <Box>
          <Tabs
            value={tabValue}
            onChange={handleTabChange}
            aria-label="Navigation"
            centered
          >
            <Tab label="Checklist" {...tabProps(0)} />
            <Tab label="Events" {...tabProps(1)} />
            <Tab label="Mari's Shop" {...tabProps(2)} />
          </Tabs>
        </Box>
        <TabPanel value={tabValue} index={0}>
          <Checklist useStore={useStore} theme={theme} />
        </TabPanel>
        <TabPanel value={tabValue} index={1}>
          <Events useStore={eventsStore} taskStore={useStore} theme={theme} />
        </TabPanel>
        <TabPanel value={tabValue} index={2}>
          <Arbitrage useStore={arbitrageStore} theme={theme} />
        </TabPanel>
        <Box
          sx={{
            my: 1,
            p: { xs: 1, md: 1 },
          }}
        >
          <Typography align="center">
            Lost Ark Game content and assets are trademarks of Smilegate RPG,
            Inc.
          </Typography>
        </Box>
      </Container>
    </ThemeProvider>
  );
}

export default App;