import React from 'react';
import {
  Step,
  Stepper,
  StepButton,
  StepContent,
} from 'material-ui/Stepper';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import Badge from 'material-ui/Badge';
import NotificationsIcon from 'material-ui/svg-icons/social/notifications';

import DataStep   from './components/steps/data-step'  ;
import EventStep  from './components/steps/event-step' ;
import ArenaStep  from './components/steps/arena-step' ;
import ListStep   from './components/steps/list-step'  ;
import BuyStep    from './components/steps/buy-step'   ;

/**
 * A basic vertical non-linear implementation
 */
class MDSteppers extends React.Component {

  constructor(props) {
    super(props);

    this.handleNext = this.handleNext.bind(this);
    this.handlePrev = this.handlePrev.bind(this);
    this.state = {
      stepIndex: 0,
    };
  }


  handleNext() {
    const {stepIndex} = this.state;
    if (stepIndex < 4) {
      this.setState({stepIndex: stepIndex + 1});
    }
  };

  handlePrev (){
    const {stepIndex} = this.state;
    if (stepIndex > 0) {
      this.setState({stepIndex: stepIndex - 1});
    }
  };


  renderStepActions(step) {
    return (
      <div style={{margin: '12px 0'}}>
        {step !== 4 &&
        (<RaisedButton
          label="Далее"
          disableFocusRipple={true}
          primary={true}
          onClick={this.handleNext}
          style={{marginRight: 12}}
        />)
        }
        {step > 0 &&
        (<FlatButton
            label="Назад"
            disableTouchRipple={true}
            disableFocusRipple={true}
            onClick={this.handlePrev}
          />)
        }
        {step === 3 &&
        (<RaisedButton
              label="Выбрать еще услуги"
              disableFocusRipple={true}
              primary={true}
              onClick={() => {
                this.setState({stepIndex: 1});
              }}
              style={{marginLeft: 10, marginRight: 10}}
            />)
        }
        {step === 4 &&
        (<RaisedButton
            label="Купить"
            disableFocusRipple={true}
            secondary={true}
          />)
        }
      </div>
    );
  }

  render() {
    const {stepIndex} = this.state;

    return (
      <div className={"wrapper"}>
        <Stepper
          activeStep={stepIndex}
          linear={false}
          orientation="vertical"
        >
          <Step>
            <StepButton onClick={() => this.setState({stepIndex: 0})}>
              Выберите дату:
            </StepButton>
            <StepContent>
              <DataStep onSubmit={this.handleNext} />
            </StepContent>
          </Step>

          <Step>
            <StepButton onClick={() => this.setState({stepIndex: 1})}>
              Выберите мероприятие:
            </StepButton>
            <StepContent>
              <EventStep onSubmit={this.handleNext} handlePrev={this.handlePrev} />
            </StepContent>
          </Step>

          <Step>
            <StepButton onClick={() => this.setState({stepIndex: 2})}>
              Шоу
            </StepButton>
            <StepContent>
              <ArenaStep onSubmit={this.handleNext} handlePrev={this.handlePrev} />
            </StepContent>
          </Step>

          <Step>
            <StepButton onClick={() => this.setState({stepIndex: 3})}>
              <Badge
                badgeContent={1}
                primary={true}
              >
                <NotificationsIcon />
                Бронь:
              </Badge>
            </StepButton>
            <StepContent>
              <ListStep />
              {this.renderStepActions(3)}
            </StepContent>
          </Step>

          <Step>
            <StepButton onClick={() => this.setState({stepIndex: 4})}>
              Оформить заказ:
            </StepButton>
            <StepContent>
              <BuyStep onSubmit={this.handleNext} handlePrev={this.handlePrev}  />
            </StepContent>
          </Step>
        </Stepper>
      </div>
    );
  }
}

export default MDSteppers;