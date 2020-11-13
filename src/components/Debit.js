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
        </div>
    )/*:<Redirect to='/login'/>*/
}

