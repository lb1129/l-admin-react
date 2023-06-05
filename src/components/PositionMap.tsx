import React, { useRef, useEffect } from 'react'
import { useResizeHeight } from '@/hooks/resize-height'
import usePositionStyles from './PositionMap.style'

export interface PositionInfo {
  province: string
  city: string
  address: string
  point: {
    lng: number
    lat: number
  }
}

type Props = {
  onChange?: (record: PositionInfo) => void
}

const PositionMap = (props: Props) => {
  const wrapRef = useRef<HTMLDivElement>(null)
  const nodeRef = useRef<HTMLDivElement>(null)
  const suggestRef = useRef<HTMLInputElement>(null)
  const resultRef = useRef<HTMLDivElement>(null)
  const suggestionRef = useRef<HTMLElement | null>()
  const { height } = useResizeHeight(wrapRef)
  const styles = usePositionStyles()
  const distanceBottom = 200
  useEffect(() => {
    if (suggestionRef.current) {
      suggestionRef.current.style.height = `${height - distanceBottom}px`
    }
  }, [height])
  // 绘制地图
  useEffect(() => {
    const nodeRaw = nodeRef.current
    if (nodeRaw) {
      const localcity = new BMapGL.LocalCity()
      localcity.get((e) => {
        const map = new BMapGL.Map(nodeRaw)
        const point = new BMapGL.Point(e.center.lng, e.center.lat)
        map.centerAndZoom(point, 13)
        map.enableScrollWheelZoom()

        // 添加比例尺控件
        const scaleControl = new BMapGL.ScaleControl()
        map.addControl(scaleControl)
        // 添加缩放控件
        const zoomControl = new BMapGL.ZoomControl()
        map.addControl(zoomControl)
        // 添加定位控件
        const locationControl = new BMapGL.LocationControl()
        map.addControl(locationControl)
        // 添加3D控件
        const navigationControl3D = new BMapGL.NavigationControl3D()
        map.addControl(navigationControl3D)
        // 添加全景地图控件（AK暂无权限）
        //   const panoramaControl = new BMapGL.PanoramaControl()
        //   map.addControl(panoramaControl)

        // 关键字提示输入
        const autocomplete = new BMapGL.Autocomplete({
          input: suggestRef.current as HTMLInputElement,
          location: map
        })

        // 位置检索
        const localSearch = new BMapGL.LocalSearch(map, {
          renderOptions: {
            map: map,
            panel: resultRef.current as HTMLDivElement
          }
        })
        localSearch.enableAutoViewport()
        localSearch.disableFirstResultSelection()
        localSearch.setInfoHtmlSetCallback((e) => {
          props.onChange &&
            props.onChange({
              province: e.province,
              city: e.city,
              address: e.address,
              point: e.point
            })
          // 当前查看的位置Mark居中
          map.panTo(new BMapGL.Point(e.point.lng, e.point.lat))
        })

        // 关键字提示输入点击后进行位置检索
        autocomplete.onconfirm = (e) => {
          suggestRef.current?.blur()
          const { province, city, district, street, streetNumber, business } = e.item.value
          localSearch.setLocation(`${province}${city}${district}${street}${streetNumber}`)
          localSearch.search(business)
        }

        // autocomplete 无配置获取由BMAP渲染的输入提示列表DOM
        // 暂时先这样处理获取输入提示列表DOM，然后设置其最大高度，防止内容超出容器
        setTimeout(() => {
          // @ts-ignore-next-line
          const suggestionDomId = autocomplete?._suggestion?.mainId
          suggestionRef.current = document.getElementById(suggestionDomId)
        }, 200)
      })
    }
  }, [props])

  return (
    <div className={styles.wrap} ref={wrapRef}>
      <div className={styles.content} ref={nodeRef}></div>
      <input type="text" placeholder="搜索位置" className={styles.searchInput} ref={suggestRef} />
      <div
        className={styles.searchResult}
        style={{ maxHeight: `${height - distanceBottom}px` }}
        ref={resultRef}
      ></div>
    </div>
  )
}

export default PositionMap
