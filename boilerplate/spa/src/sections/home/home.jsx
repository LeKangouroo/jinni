import events from 'core/events';
import React from 'react';

class HomeSection extends React.Component
{
  constructor(props)
  {
    super(props);
    this.name = 'HomeSection';
  }
  componentDidMount()
  {
    events.notifyObservers('section:loaded', this);
  }
  componentWillUnmount()
  {
    events.notifyObservers('section:destroyed', this);
  }
  getName()
  {
    return this.name;
  }
  render()
  {
    return (
      <section className="s-home">
        <h1>Home section</h1>
      </section>
    );
  }
}

export default HomeSection;
