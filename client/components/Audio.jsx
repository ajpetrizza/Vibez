import React from 'react';

class Audio extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedFile: ''
    }

    this.onFileChange = this.onFileChange.bind(this);
  }

  //helper
  onFileChange(event) {
    // this.setState({
    //   selectedFile: event.target.files[0]
    // });
    var file = event.target.files[0];
    document.getElementById('src').setAttribute('src', URL.createObjectURL(file));
    const player = document.getElementById('audio');
    player.load();
    player.play();
  }

  render() {
    return (
      <div className='audio-upload'>
        <div className='header-flex'>
          <label htmlFor="thefile" className="file"> Choose an audio file
          </label>
          <input type="file" id="thefile" accept="audio/*" onChange={(e) => { this.onFileChange(e) }} />

          <audio id="audio" controls>
            <source id='src' src='' type='audio/mpeg'></source>
          </audio>
        </div>

      </div>
    );
  }
}

export default Audio;