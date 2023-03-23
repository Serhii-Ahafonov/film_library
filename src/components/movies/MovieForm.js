import React, { useState } from 'react';
import { ADD_MOVIE_INPUTS } from '../constants';
import { useSelector } from 'react-redux';
import Card from '../ui/Card';
import Input from '../ui/Input';
import classes from './MovieForm.module.css';
import Select from '../ui/Select';

function MovieForm({ onAddMovie }) {
  const { errors } = useSelector((state) => state.allMovies);
  const [inputs, setInputs] = useState({ title: '', year: '', format: '', actors: ''});

  const updateInputValueHandler = (inputIdentifier, enteredValue) => {
    setInputs((curInputs) => {
      return {
        ...curInputs,
        [inputIdentifier]: enteredValue.target.value
      };
    });
  };

  const importHandler = (event) => {
    const file = event.target.files[0];
    const formData = new FormData();
    formData.append("movies", file, file.name);

    onAddMovie(formData, true);
  }

  const addHandler = (event) => {
    event.preventDefault();
    onAddMovie({
      title: inputs.title,
      year: inputs.year,
      format: inputs.format,
      actors: inputs.actors.split(','),
    });
  }

  return (
    <Card>
      <form className={classes.form} onSubmit={addHandler}>
        {
          Object.keys(ADD_MOVIE_INPUTS).map(key => {
            if (key === 'format') {
              return (
                <Select title={key} name={key}
                  options={['VHS', 'Blu-ray', 'DVD']}
                  errorMessage={errors[key]}
                  onChangeHandler={updateInputValueHandler}/>
              );
            }
            return (
              <Input key={key} name={key} type={key}
                title={ADD_MOVIE_INPUTS[key].name}
                errorMessage={errors[key]}
                onChangeHandler={updateInputValueHandler}/>
            );
          })
        }
        <div className={classes.actions}>
          <div className={classes.import}>
            <label htmlFor="upload-movies">Import Movies...</label>
            <input id="upload-movies" name="movies" type="file" accept=".txt" onChange={importHandler}/>
          </div>
          <button>Add Movie</button>
        </div>
      </form>
    </Card>
  );
}

export default MovieForm;
