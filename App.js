import React from 'react';
import { StyleSheet, Text, Image, View, ScrollView, TouchableOpacity, StatusBar } from 'react-native';
import axios from 'axios'

const apiBaseUrl = 'https://api.themoviedb.org/3'
const posterBaseUrl = 'https://image.tmdb.org/t/p/w300'

export default class App extends React.Component {
  state = {
    movies: []
  }

  getMovies = () => {
    const params = {
      api_key: 'ce988ffcdb72a12d80cb923f413787b0',
      region: 'id'
    }
    axios({
      url: apiBaseUrl + '/movie/now_playing',
      params
    }).then(response => {
      console.log(response.data)
      const movies = response.data.results.map(movie => {
        return {
          id: movie.id,
          title: movie.title,
          img: movie.poster_path,
          desc: movie.overview
        }
      })
      this.setState({
        movies
      })
    }).catch(error => {
      console.log(error)
    })
  }

  componentDidMount() {
    this.getMovies()
  }

  render() {
    return (
      <ScrollView>
        <View style={style.container}>
          <Text style={{ paddingBottom: 16, fontSize: 18, fontWeight: 'bold' }}>
            Sedang Tayang
          </Text>
          {
            this.state.movies.map(movie => (
              <MovieCard
                key={movie.id}
                img={posterBaseUrl + movie.img}
                title={movie.title}
                desc={movie.desc}
              />
            ))
          }
        </View>
      </ScrollView>
    );
  }
}

class MovieCard extends React.Component {
  render() {
    return (
      <TouchableOpacity>
        <View style={style.cardContainer}>
          <Image style={style.cardImage} source={{ uri: this.props.img }} />
          <View style={style.cardInfo}>
            <Text style={style.cardTitle}>{this.props.title}</Text>
            <Text numberOfLines={6}>{this.props.desc}</Text>
          </View>
        </View>
      </TouchableOpacity>
    )
  }
}

const style = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: StatusBar.currentHeight + 12,
    paddingHorizontal: 12,
    backgroundColor: '#f1f1f1'
  },
  cardContainer: {
    flexDirection: 'row',
    backgroundColor: '#f9f9f9',
    marginBottom: 12
  },
  cardImage: {
    width: 100,
    height: 150
  },
  cardInfo: {
    paddingHorizontal: 12,
    paddingVertical: 12,
    flex: 1
  },
  cardTitle: {
    fontSize: 14,
    fontWeight: 'bold'
  }
})