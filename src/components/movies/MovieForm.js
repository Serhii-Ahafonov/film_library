import React, { useState } from 'react';
import { ADD_MOVIE_INPUTS } from '../constants';
import { useSelector } from 'react-redux';
import Card from '../ui/Card';
import Input from '../ui/Input';
import classes from './MovieForm.module.css';
import Select from '../ui/Select';
import { hasOnlyLettersWithDashComma, hasOnlySpaces } from '../../utils/regex';

function MovieForm({ onAddMovie }) {
  const [inputs, setInputs] = useState({ title: '', year: '', format: '', actors: ''});
  const [customErrors, setCustomErrors] = useState({});
  const { errors } = useSelector((state) => state.allMovies);

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

    const isValidTitle = !hasOnlySpaces(inputs.title);
    const isValidYear = !hasOnlySpaces(inputs.year);
    const isValidFormat = !hasOnlySpaces(inputs.format);
    const isValidActors = hasOnlyLettersWithDashComma(inputs.actors);
    const isValidInputs = isValidTitle && isValidYear && isValidFormat && isValidActors;

    if (isValidInputs) {
      onAddMovie({
        title: inputs.title,
        year: inputs.year,
        format: inputs.format,
        actors: inputs.actors.split(','),
      });
    }

    setCustomErrors( {
      title: !isValidTitle && 'required',
      year: !isValidYear && 'required',
      format: !isValidFormat && 'required',
      actors: !isValidActors && 'should not have special symbols like !#$%'
    });
  }

  return (
    <Card>
      <form className={classes.form} onSubmit={addHandler}>
        {
          Object.keys(ADD_MOVIE_INPUTS).map(key => {
            if (key === 'format') {
              return (
                <Select title={key} name={key} key={key}
                  options={['VHS', 'Blu-Ray', 'DVD']}
                  errorMessage={errors[key] || customErrors[key]}
                  onChangeHandler={updateInputValueHandler}/>
              );
            }
            return (
              <Input key={key} name={key} type={key}
                title={ADD_MOVIE_INPUTS[key].name}
                errorMessage={errors[key] || customErrors[key]}
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
