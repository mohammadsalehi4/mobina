/* eslint-disable no-unused-vars */
// ** Reactstrap Imports
import AvatarGroup from '@components/avatar-group'
import react from '@src/assets/images/icons/react.svg'
import vuejs from '@src/assets/images/icons/vuejs.svg'
import angular from '@src/assets/images/icons/angular.svg'
import bootstrap from '@src/assets/images/icons/bootstrap.svg'
import avatar1 from '@src/assets/images/portrait/small/avatar-s-5.jpg'
import avatar2 from '@src/assets/images/portrait/small/avatar-s-6.jpg'
import avatar3 from '@src/assets/images/portrait/small/avatar-s-7.jpg'
import { MoreVertical, Edit, Trash } from 'react-feather'
import { Table, Badge, UncontrolledDropdown, DropdownMenu, DropdownItem, DropdownToggle, Card } from 'reactstrap'

const avatarGroupData1 = [
  {
    title: 'Gretchen',
    img: avatar1,
    imgHeight: 26,
    imgWidth: 26
  },
  {
    title: 'Hunter',
    img: avatar2,
    imgHeight: 26,
    imgWidth: 26
  },
  {
    title: 'Allistair',
    img: avatar3,
    imgHeight: 26,
    imgWidth: 26
  }
]

const avatarGroupData2 = [
  {
    title: 'Macy',
    img: avatar1,
    imgHeight: 26,
    imgWidth: 26
  },
  {
    title: 'Eve',
    img: avatar2,
    imgHeight: 26,
    imgWidth: 26
  },
  {
    title: 'Damian',
    img: avatar3,
    imgHeight: 26,
    imgWidth: 26
  }
]

const avatarGroupData3 = [
  {
    title: 'Jade',
    img: avatar1,
    imgHeight: 26,
    imgWidth: 26
  },
  {
    title: 'Destiny',
    img: avatar2,
    imgHeight: 26,
    imgWidth: 26
  },
  {
    title: 'Cade',
    img: avatar3,
    imgHeight: 26,
    imgWidth: 26
  }
]

const avatarGroupData4 = [
  {
    title: 'Bruno',
    img: avatar1,
    imgHeight: 26,
    imgWidth: 26
  },
  {
    title: 'Griffin',
    img: avatar2,
    imgHeight: 26,
    imgWidth: 26
  },
  {
    title: 'Anthony',
    img: avatar3,
    imgHeight: 26,
    imgWidth: 26
  }
]

const TagAddresses = () => {
      return (
        <Card className='post'>          
          <div>
              <h6 className='mt-3 pe-3 pt-2 pb-2'>
                آدرس های تگ زده شده
              </h6>
          </div>
          <Table striped responsive className='profileTables'>
            <thead>
              <tr>
                <th className='profileTables'>Project</th>
                <th className='profileTables'>Client</th>
                <th className='profileTables'>Users</th>
                <th className='profileTables'>Status</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  <span className='align-middle fw-bold'>Angular Project</span>
                </td>
                <td>Peter Charles</td>
                <td>
                  <AvatarGroup data={avatarGroupData1} />
                </td>
                <td>
                  <Badge pill color='light-primary' className='me-1'>
                    Active
                  </Badge>
                </td>
              </tr>
              <tr>
                <td>
                  <span className='align-middle fw-bold'>React Project</span>
                </td>
                <td>Ronald Frest</td>
                <td>
                  <AvatarGroup data={avatarGroupData2} />
                </td>
                <td>
                  <Badge pill color='light-success' className='me-1'>
                    Completed
                  </Badge>
                </td>
              </tr>
              <tr>
                <td>
                  <span className='align-middle fw-bold'>Vuejs Project</span>
                </td>
                <td>Jack Obes</td>
                <td>
                  <AvatarGroup data={avatarGroupData3} />
                </td>
                <td>
                  <Badge pill color='light-info' className='me-1'>
                    Scheduled
                  </Badge>
                </td>
              </tr>
              <tr>
                <td>
                  <span className='align-middle fw-bold'>Bootstrap Project</span>
                </td>
                <td>Jerry Milton</td>
                <td>
                  <AvatarGroup data={avatarGroupData4} />
                </td>
                <td>
                  <Badge pill color='light-warning' className='me-1'>
                    Pending
                  </Badge>
                </td>
              </tr>
            </tbody>
          </Table>
        </Card>
      )
}
export default TagAddresses
