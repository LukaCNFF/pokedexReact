import React from "react";
import Card from "./Card/Card";
import Pokeinfo from "./Pokeinfo/Pokeinfo";
import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
import Search from "./Search/Search";
import Filter from "./Filter/Filter";
import { pokemonTypes } from "../pokemonTypes";
import { Button, Menu, Fade } from "@mui/material";
import { Close } from "@mui/icons-material";
import { Chart } from "react-google-charts";

const Main = () => {
  const [pokeData, setPokeData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [url, setUrl] = useState("https://pokeapi.co/api/v2/pokemon/");
  const [nextUrl, setNextUrl] = useState();
  const [prevUrl, setPrevUrl] = useState();
  const [pokeDex, setPokeDex] = useState();
  const imgUrl = require(`../assets/pokedex/podexLogo.png`);

  const [allPokemons, setAllPokemons] = useState({});
  const [chartData, setChartData] = useState([]);

  const [filtered, setFiltered] = useState(false);

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const pokeFun = async () => {
    if (pokeData.length > 0) {
      setPokeData([]);
    }
    setLoading(true);
    const res = await axios.get(url);
    setNextUrl(res.data.next);
    setPrevUrl(res.data.previous);
    getPokemon(res.data.results);
    setLoading(false);
  };
  const getPokemon = async (res) => {
    res.map(async (item) => {
      const result = await axios.get(item.url);
      setPokeData((state) => {
        state = [...state, result.data];
        state.sort((a, b) => (a.id > b.id ? 1 : -1));
        return state;
      });
    });
  };

  useEffect(() => {
    pokeFun();
  }, [url]);

  const getAllPokemonsByType = async (res) => {
    const bugPokemons = await axios.get("https://pokeapi.co/api/v2/type/bug");
    const darkPokemons = await axios.get("https://pokeapi.co/api/v2/type/dark");
    const dragonPokemons = await axios.get(
      "https://pokeapi.co/api/v2/type/dragon"
    );
    const electricPokemons = await axios.get(
      "https://pokeapi.co/api/v2/type/electric"
    );
    const fairyPokemons = await axios.get(
      "https://pokeapi.co/api/v2/type/fairy"
    );
    const fightingPokemons = await axios.get(
      "https://pokeapi.co/api/v2/type/fighting"
    );
    const firePokemons = await axios.get("https://pokeapi.co/api/v2/type/fire");
    const flyingPokemons = await axios.get(
      "https://pokeapi.co/api/v2/type/flying"
    );
    const ghostPokemons = await axios.get(
      "https://pokeapi.co/api/v2/type/ghost"
    );
    const grassPokemons = await axios.get(
      "https://pokeapi.co/api/v2/type/grass"
    );
    const groundPokemons = await axios.get(
      "https://pokeapi.co/api/v2/type/ground"
    );
    const icegPokemons = await axios.get("https://pokeapi.co/api/v2/type/ice");
    const normalPokemons = await axios.get(
      "https://pokeapi.co/api/v2/type/normal"
    );
    const poisonPokemons = await axios.get(
      "https://pokeapi.co/api/v2/type/poison"
    );
    const psychicPokemons = await axios.get(
      "https://pokeapi.co/api/v2/type/psychic"
    );
    const rockPokemons = await axios.get("https://pokeapi.co/api/v2/type/rock");
    const steelPokemons = await axios.get(
      "https://pokeapi.co/api/v2/type/steel"
    );
    const waterkPokemons = await axios.get(
      "https://pokeapi.co/api/v2/type/water"
    );

    setAllPokemons({
      bugPokemons: bugPokemons.data.pokemon,
      darkPokemons: darkPokemons.data.pokemon,
      dragonPokemons: dragonPokemons.data.pokemon,
      electricPokemons: electricPokemons.data.pokemon,
      fairyPokemons: fairyPokemons.data.pokemon,
      fightingPokemons: fightingPokemons.data.pokemon,
      firePokemons: firePokemons.data.pokemon,
      flyingPokemons: flyingPokemons.data.pokemon,
      ghostPokemons: ghostPokemons.data.pokemon,
      grassPokemons: grassPokemons.data.pokemon,
      groundPokemons: groundPokemons.data.pokemon,
      icegPokemons: icegPokemons.data.pokemon,
      normalPokemons: normalPokemons.data.pokemon,
      poisonPokemons: poisonPokemons.data.pokemon,
      psychicPokemons: psychicPokemons.data.pokemon,
      rockPokemons: rockPokemons.data.pokemon,
      steelPokemons: steelPokemons.data.pokemon,
      waterkPokemons: waterkPokemons.data.pokemon,
    });
  };

  useEffect(() => {
    console.log("AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA");
    getAllPokemonsByType();
  }, []);

  useEffect(() => {
    if (Object.keys(allPokemons).length > 0) {
      setChartData([
        ["Pokemons", "Types"],
        ["Bug", Object.keys(allPokemons.bugPokemons).length],
        ["Dark", Object.keys(allPokemons.darkPokemons).length],
        ["Dragon", Object.keys(allPokemons.dragonPokemons).length],
        ["Electric", Object.keys(allPokemons.electricPokemons).length],
        ["Fairy", Object.keys(allPokemons.fairyPokemons).length],
        ["Fighting", Object.keys(allPokemons.fightingPokemons).length],
        ["Fire", Object.keys(allPokemons.firePokemons).length],
        ["Flying", Object.keys(allPokemons.flyingPokemons).length],
        ["Ghost", Object.keys(allPokemons.ghostPokemons).length],
        ["Grass", Object.keys(allPokemons.grassPokemons).length],
        ["Ground", Object.keys(allPokemons.groundPokemons).length],
        ["Ice", Object.keys(allPokemons.icegPokemons).length],
        ["Normal", Object.keys(allPokemons.normalPokemons).length],
        ["Poison", Object.keys(allPokemons.poisonPokemons).length],
        ["Psychic", Object.keys(allPokemons.psychicPokemons).length],
        ["Rock", Object.keys(allPokemons.rockPokemons).length],
        ["Steel", Object.keys(allPokemons.steelPokemons).length],
        ["Water", Object.keys(allPokemons.waterkPokemons).length],
      ]);
    }
  }, [allPokemons]);

  const fetchSearch = async (value) => {
    if (value) {
      try {
        const result = await axios.get(
          `https://pokeapi.co/api/v2/pokemon/${value}`
        );
        setPokeData((state) => {
          state = [result.data];
          state.sort((a, b) => (a.id > b.id ? 1 : -1));
          return state;
        });
      } catch (e) {
        console.log(e);
      }
    } else {
      if (pokeData.length > 0) {
        setPokeData([]);
        pokeFun();
      }
    }
  };

  const fetchFilter = async (value) => {
    if (value) {
      try {
        const result = await axios.get(
          `https://pokeapi.co/api/v2/type/${value}`
        );
        const filteredPokemon = result.data.pokemon;
        filteredPokemon.map(async (item) => {
          if (
            item.pokemon.url
              .slice("-6")
              .replace(/\D/g, "")
              .replaceAll("/", "") < 10000
          ) {
            setPokeData([]);
            const result = await axios.get(item.pokemon.url);
            setPokeData((state) => {
              state = [...state, result.data];
              state.sort((a, b) => (a.id > b.id ? 1 : -1));
              return state;
            });
          }
        });
        setFiltered(true);
      } catch (e) {
        console.log(e);
      }
    }
  };

  const options = {
    title: "All Pokemons By Type",
    is3D: true,
    backgroundColor: "transparent",
    titleTextStyle: {
      color: "white",
    },
    subtitleTextStyle: {
      color: "white",
    },
    legend: {
      position: "none",
      textStyle: { fontSize: 15, color: "white" },
    },
    colors: [
      "#92c33b",
      "#595365",
      "#2f6ec4",
      "#f5d447",
      "#ec90e7",
      "#cf3f6b",
      "#f19d52",
      "#91abdf",
      "#5169ae",
      "#63bc5a",
      "#da7943",
      "#73cfc1",
      "#949ba3",
      "#ac6bca",
      "#ed7079",
      "#c6b88d",
      "#668ea1",
      "#4f91d7",
    ],
  };

  return (
    <>
      <div className="header">
        <img src={imgUrl} width={200} height={60} alt="logo" />
      </div>
      <div className="search-filter-container">
        <Search fetchSearch={fetchSearch} />
        <Menu
          id="fade-menu"
          MenuListProps={{
            "aria-labelledby": "fade-button",
          }}
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          TransitionComponent={Fade}
        >
          <button
            onClick={() => {
              pokeFun();
              handleClose();
              setFiltered(false);
            }}
            className="clear-button"
          >
            <Close fontSize="16" />
            <span>Clear</span>
          </button>
          {pokemonTypes.map(({ name }) => {
            return (
              <Filter
                fetchFilter={fetchFilter}
                type={name}
                handleClose={handleClose}
              />
            );
          })}
        </Menu>
        <div className="menuTypes">
          {pokemonTypes.map(({ name }) => {
            return (
              <Filter
                fetchFilter={fetchFilter}
                type={name}
                handleClose={handleClose}
              />
            );
          })}
        </div>
      </div>
      <div className="charts">
        {chartData.length > 0 && (
          <Chart
            chartType="PieChart"
            data={chartData}
            options={options}
            width={"calc(50vw - 250px)"}
            height={"700px"}
            background={"rgb(59, 64, 113)"}
          />
        )}
      </div>
      <Pokeinfo data={pokeDex} />
      <div className="container">
        <div className="left-content">
          {/* {pokeData.length > 0 && (
            <Card
              key={pokeData.id}
              pokemon={pokeData}
              loading={loading}
              infoPokemon={(poke) => setPokeDex(poke)}
            />
          )} */}
        </div>
        <div className="right-content">
          {pokeData.length > 0 && (
            <Card
              key={pokeData.id}
              pokemon={pokeData}
              loading={loading}
              infoPokemon={(poke) => setPokeDex(poke)}
            />
          )}
        </div>
      </div>
      <div className="btn-group">
        {!filtered && (
          <>
            {prevUrl && (
              <button
                onClick={() => {
                  setPokeData([]);
                  setUrl(prevUrl);
                }}
              >
                Previous
              </button>
            )}
            {nextUrl && (
              <button
                onClick={() => {
                  setPokeData([]);
                  setUrl(nextUrl);
                }}
              >
                Next
              </button>
            )}
          </>
        )}
      </div>
    </>
  );
};
export default Main;
