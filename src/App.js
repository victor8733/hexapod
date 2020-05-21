import React from "react"
import { BrowserRouter as Router, Route, Switch } from "react-router-dom"
import { NavBar, NavFooter } from "./components/Nav"
import HexapodPlot from "./components/HexapodPlot"
import DimensionWidgets from "./components/DimensionWidgets"
import ForwardKinematicsWidgets from "./components/ForwardKinematicsWidgets"
import InverseKinematicsWidgets from "./components/InverseKinematicsWidgets"
import {
  DIMENSIONS,
  POSE,
  IK_PARAMS,
} from "./components/templates/hexapodParams"

class App extends React.Component {
  state = {
    currentPage: {},
    ikParams: IK_PARAMS,
    alerts: "",
    messages: "",
    hexapod: {
      dimensions: DIMENSIONS,
      pose: POSE,
      points: {},
    },
  }

  updateDimensions = (name, value) => {
    const dimensions = { ...this.state.hexapod.dimensions, [name]: value }
    this.setState({
      hexapod: { ...this.state.hexapod, dimensions: dimensions },
    })
  }

  updateIkParams = (name, value) => {
    this.setState({
      ikParams: { ...this.state.ikParams, [name]: value },
    })
  }

  updatePose = (legName, angle, value) => {
    const { pose } = this.state.hexapod
    const newPose = {
      ...pose,
      [legName]: { ...pose[legName], [angle]: value },
    }
    this.setState({ hexapod: { ...this.state.hexapod, pose: newPose } })
  }

  renderPageContent = () => {
    return (
      <Switch>
        <Route path="/" exact>
          <h2>Hello world!</h2>
        </Route>
        <Route path="/forward-kinematics">
          <ForwardKinematicsWidgets
            pose={this.state.hexapod.pose}
            onUpdate={this.updatePose}
          />
        </Route>
        <Route path="/inverse-kinematics">
          <InverseKinematicsWidgets
            params={this.state.ikParams}
            onUpdate={this.updateIkParams}
          />
        </Route>
      </Switch>
    )
  }

  render() {
    return (
      <Router>
        <NavBar />
        <div className="row-container">
          <div className="sidebar column-container">
            <DimensionWidgets
              dimensions={this.state.hexapod.dimensions}
              onUpdate={this.updateDimensions}
            />
            <div className="main-content">{this.renderPageContent()}</div>
            <NavFooter />
          </div>
          <div className="graph">
            <HexapodPlot />
          </div>
        </div>
      </Router>
    )
  }
}

export default App