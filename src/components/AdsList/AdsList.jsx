import React, { Fragment } from 'react'
// Components
import ItemMusician from './ItemMusician'
import ItemVendor from './ItemVendor'

// Styles
import styled from 'styled-components/native'
import { observer } from 'mobx-react-lite'

const AdsListContainer = styled.View`
  width: 100%;
  margin-top: 16px;
`
const AdsList = observer(({ adsList, isForContractor }) => {
  if (adsList === undefined) {
    return
  }

  return (
    <AdsListContainer>
      {adsList?.map((item, id) => {
        return isForContractor === true ? (
          <ItemMusician data={item} key={id} />
        ) : (
          <Fragment key={id}>
            <ItemVendor data={item} key={id} />
          </Fragment>
        )
      })}
    </AdsListContainer>
  )
})

export default AdsList
