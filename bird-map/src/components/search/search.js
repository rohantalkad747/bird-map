import {Typeahead} from 'react-bootstrap-typeahead'
import 'react-bootstrap-typeahead/dist/react-bootstrap-typeahead';
import * as React  from "react";
import {FormGroup} from 'reactstrap';
import 'react-bootstrap-typeahead/css/Typeahead.css';

class Search extends React.Component {

    render() {
        console.log(this.props)
        return (
            <React.Fragment>
                <Typeahead
                    labelKey="bird_name"
                    multiple={true}
                    onChange = {this.props.handleChange}
                    options={this.props.options}
                    placeholder="Choose a bird ..."
                />
            </React.Fragment>
        );
    }
}
export default Search;