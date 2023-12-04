import axios from 'axios';

axios.get('http://localhost:1337/api/users/me').then(response => {
  console.log(response);
});
