import React, { useContext } from 'react';
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
      <div className='row  mt-2' style={{ height: '500px' }}>
        <div className='col-md-4' id='bentrai'>
          <BenTren />
          <BenDuoi />
        </div>
        {/* <div className='col-md-8' id='benphai'>
          <BenPhai />
        </div> */}
        <div className="tab-content col-md-8" id='benphai'>
          <div role="tabpanel" className="tab-pane fade" id="profile"> <BenPhai /> </div>
          <div role="tabpanel" className="tab-pane fade in active" id="buzz">Gioi thieu</div>
          <div role="tabpanel" className="tab-pane fade" id="references">Danh sach co</div>
        </div>
      </div>
      

      {/* <div class="tab-content">
        <div role="tabpanel" class="tab-pane fade in active" id="profile">...</div>
        <div role="tabpanel" class="tab-pane fade" id="buzz">bbb</div>
        <div role="tabpanel" class="tab-pane fade" id="references">ccc</div>
      </div> */}
    </div>
  )/*:<Redirect to='/login'/>*/
}

