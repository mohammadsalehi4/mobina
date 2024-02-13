// ** React Imports
import { useRef, useState } from 'react'

// ** Custom Components
import Wizard from '@components/wizard'

// ** Steps
import St3 from './steps/st3'
import St2 from './steps/st2'
import St1 from './steps/st1'

// ** Icons Imports
import { FileText, User, MapPin, Link } from 'react-feather'

const WizardModern = () => {
  // ** Ref
  const ref = useRef(null)

  // ** State
  const [stepper, setStepper] = useState(null)

  const steps = [
    {
      id: 'step1',
      title: 'استخراج کننده',
      subtitle: 'اطلاعات هویتی',
      icon: <FileText size={18} />,
      content: <St1 stepper={stepper} type='wizard-modern'  style={{marginLeft:"5px"}} />
    },
    {
      id: 'personal-info',
      title: 'اطلاعات تکمیلی',
      subtitle: 'اطلاعات ماینر‌ها',
      icon: <User size={18} />,
      
      content: <St2 stepper={stepper} type='wizard-modern' />
    }
  ]

  return (
    <div className='modern-horizontal-wizard'>
      <Wizard
        type='modern-horizontal'
        ref={ref}
        steps={steps}
        options={{
          linear: true
        }}
        instance={el => setStepper(el)}
      />
    </div>
  )
}

export default WizardModern
