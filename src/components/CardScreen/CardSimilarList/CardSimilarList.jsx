import React, { useEffect, useMemo, useState } from 'react'
import { apiMocks } from '@/api/mock/apiMocks'
// Components
import ItemMusician from '@/components/AdsList/ItemMusician'
import ItemVendor from '@/components/AdsList/ItemVendor'
// Styles
import styled from 'styled-components/native'
import { M } from '@/res/mixin'
import { useSearchApiStore } from '@/stores/SearchApi'
import { observer } from 'mobx-react-lite'

const SimilarListContainer = styled.View`
  width: 100%;
`
const SimilarListTitle = styled(M.TitleBold20)`
  margin-bottom: 16px;
`
const CardSimilarList = observer(({ isMusician, setScrollToTop, userId }) => {
  const { vendorList, musicianList, setList } = useSearchApiStore()
  if (isMusician === undefined) return

  const mockApi = useMemo(() => {
    if (isMusician) {
      const list = musicianList || []

      return list.filter((l) => l.id != userId)
    } else {
      const list = vendorList || []

      let res = list.filter((l) => l.id != userId)
      return res
    }
  }, [isMusician, musicianList, vendorList])

  if (!mockApi || (mockApi && !mockApi.length)) return <></>

  return (
    <SimilarListContainer>
      <SimilarListTitle>You also may like</SimilarListTitle>
      {mockApi.map((item, id) => {
        if (id > 2) {
          return
        } else {
          return isMusician === true ? (
            <ItemMusician
              setScrollToTop={setScrollToTop}
              key={id}
              data={item}
            />
          ) : (
            <ItemVendor setScrollToTop={setScrollToTop} key={id} data={item} />
          )
        }
      })}
    </SimilarListContainer>
  )
})

export default CardSimilarList
