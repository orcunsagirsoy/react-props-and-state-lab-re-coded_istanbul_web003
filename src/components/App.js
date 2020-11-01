import React from 'react'

import Filters from './Filters'
import PetBrowser from './PetBrowser'

class App extends React.Component {
  constructor() {
    super()

    this.state = {
      error: null,
      pets: [],
      filters: {
        type: 'all'
      }
    }
  }

  fetchPets = async () => {
    if (this.state.filters.type === "all") {
      fetch("/api/pets")
      .then(res => res.json())
      .then(
        (result) => {
          console.log(result)
          this.setState({
            pets: result
          });
        },
        (error) => {
          this.setState({
            error
          });
        }
      )
    } else {
      fetch(`/api/pets?type=${this.state.filters.type}`)
      .then(res => res.json())
      .then(
        (result) => {
          console.log(result)
          this.setState({
            pets: result
          });
        },
        (error) => {
          this.setState({
            error
          });
        }
      )
    }
  }

  onAdoptPet = (id) => {
    this.setState( prevState => ({
      pets: prevState.pets.map(pet => 
        pet.id === id ? Object.assign(pet, {isAdopted: true}) : pet)
        }, console.log(this.state)
      )
    )
  }

  onChangeType = (e) => {
    this.state( {
      filters: {
        type: e.target.value
      }
    })
  }


  render() {
      const { error, pets, filters } = this.state;
      if (error) {
        return <div> Error: {error.message} </div>;
      } else {
        return(
        <div className="ui container">
        <header>
          <h1 className="ui dividing header">React Animal Shelter</h1>
        </header>
        <div className="ui container">
          <div className="ui grid">
            <div className="four wide column">
              <Filters onChangeType={this.onChangeType} onFindPetsClick={this.fetchPets}/>
            </div>
            <div className="twelve wide column">
              <PetBrowser pets={this.state.pets} onAdoptPet={this.onAdoptPet}/>
            </div>
          </div>
        </div>
      </div>
      )
  }
}
}
export default App
