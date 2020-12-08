import React, { useContext} from 'react';
import mcontext from '../Context'
import MenuBar from './MenuBar'
import BenPhai from './BenPhai'
import BenTren from './BenTren'
import BenDuoi from './BenDuoi'

export default function (props) {
    let context = useContext(mcontext)
    return /*user?*/(
        <div className='container col-md-12'>
            <MenuBar user={context.user} />
            <div className='row  mt-2' style={{height: '500px'}}>
                <div className='col-md-4' id='bentrai'>
                    <BenTren />
                    <BenDuoi />
                </div>
                <div className='col-md-8' id='benphai'>
                    <BenPhai />
                </div>
            </div>
            <ul class="nav nav-tabs" role="tablist">
  <li class="nav-item">
    <a class="nav-link active" href="#profile" role="tab" data-toggle="tab">profile</a>
  </li>
  <li class="nav-item">
    <a class="nav-link" href="#buzz" role="tab" data-toggle="tab">buzz</a>
  </li>
  <li class="nav-item">
    <a class="nav-link" href="#references" role="tab" data-toggle="tab">references</a>
  </li>
</ul>

<div class="tab-content">
  <div role="tabpanel" class="tab-pane fade in active" id="profile">...</div>
  <div role="tabpanel" class="tab-pane fade" id="buzz">bbb</div>
  <div role="tabpanel" class="tab-pane fade" id="references">ccc</div>
</div>
        </div>
    )/*:<Redirect to='/login'/>*/
}

