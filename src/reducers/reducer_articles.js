import { FETCH_ARTICLES } from '../actions';

const defaultStatus = {
    awardLevel: '1'
  };

export default function (state = defaultStatus, action) {
  if (action) {
    switch (action.type) {
      case FETCH_ARTICLES:
        /*
        TODO: a. fetch the articles when no existing data
              b. if data exist, check the expired date
              c. fetch if the data are expired
        */ 
       /*fetch(('http://test.educoco.com:5000/articlesbf'), {
            method: 'GET'}).then((response) => {
              if (response.status === 200) {
                response.json().then(json => {
                                      this.setState(Object.assign({}, this.state, {'configObjs': json.data, 'loading': false}));
                                    });
              } else {
                //console.log(response.status);
              }
            })
            .catch((error) => {
              //console.log(error);
            });*/
        return action.payload;
      default:
        return state;
    }
  }
}