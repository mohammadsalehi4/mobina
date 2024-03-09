import React, { Fragment, useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import UiLoader from '@components/ui-loader'
import { ChevronDown, RotateCw, X } from 'react-feather'
import { Card, CardHeader, CardTitle, Collapse } from 'reactstrap'

const CardActions = props => {
  const { title, actions, children, collapseIcon, reloadIcon, removeIcon, endReload } = props

  const [reload, setReload] = useState(false)
  const [collapse, setCollapse] = useState(false)
  const [visibility, setVisibility] = useState(true)

  const Icons = {
    collapse: collapseIcon ? collapseIcon : ChevronDown,
    remove: removeIcon ? removeIcon : X,
    reload: reloadIcon ? reloadIcon : RotateCw
  }

  const callAction = (action, event) => {
    // Prevent event from bubbling up to the Card's onClick if it's one of the icons
    if (event) {
      event.stopPropagation()
    }

    switch (action) {
      case 'collapse':
        return setCollapse(!collapse)
      case 'remove':
        return setVisibility(false)
      case 'reload':
        return setReload(true)
      default:
    }
  }

  const renderIcons = () => {
    if (Array.isArray(actions)) {
      return actions.map((action, i) => {
        const Tag = Icons[action]
        return (
          <Tag
            key={i}
            className={classnames('cursor-pointer', { 'me-50': i < actions.length - 1 })}
            size={15}
            onClick={(e) => callAction(action, e)}
          />
        )
      })
    } else {
      const Tag = Icons[actions]
      return <Tag className='cursor-pointer' size={15} onClick={(e) => callAction(actions, e)} />
    }
  }

  useEffect(() => {
    if (reload) {
      endReload(() => setReload(false))
    }
  })

  const handleCardClick = () => {
    if (actions === 'collapse' || actions.includes('collapse')) {
      setCollapse(!collapse)
    }
  }

  return (
    <UiLoader blocking={reload}>
      <Card
        className={classnames('card-action', { 'd-none': !visibility })}
        onClick={handleCardClick} // Added onClick event to the Card
      >
        <CardHeader>
          <CardTitle tag='h4'>{title}</CardTitle>
          <div className='action-icons'>{renderIcons()}</div>
        </CardHeader>
        <Collapse isOpen={collapse}>
          {children}
        </Collapse>
      </Card>
    </UiLoader>
  )
}

export default CardActions

CardActions.propTypes = {
  removeIcon: PropTypes.any,
  reloadIcon: PropTypes.any,
  collapseIcon: PropTypes.any,
  title: PropTypes.string.isRequired,
  actions: PropTypes.oneOfType([PropTypes.string, PropTypes.arrayOf(PropTypes.string)]).isRequired,
  endReload: PropTypes.func
}
