import { useEffect, useRef, useState } from 'react'
import AppLenzLogo from '/applenz.svg'
import IconOpenNewTap from './../assets/icon-open-in-new-tap.svg'
import ArattaLabsLogo from './../assets/aratta-labs.svg'
import ArattaLabsLogoWhite from './../assets/aratta-labs-white.svg'
import { getNetwork, getCategory, getApp } from './../util/api'
import styles from './Home.module.scss'

function Home() {
  const [network, setNetwork] = useState({ list: [] })
  const [category, setCategory] = useState({ list: [] })
  const [app, setApp] = useState({ list: [] })
  const [backupData, setBackupData] = useState()
  const qRef = useRef()
  const categoryRef = useRef()
  const networkRef = useRef()

  const sendMessage = (e) => {
    e.preventDefault()

    const q = inputRef.current.value
    if (q === '') return

    let newData = data.list
    newData.push({ type: `q`, content: q })
    setData({ list: newData })

    // Reset the form
    e.target.reset()

    window.setTimeout(() => {
      document.querySelector(`output`).scrollTop = document.querySelector(`output`).scrollHeight
    }, 100)

    // Cal the OpenAI
    const myHeaders = new Headers()
    myHeaders.append('Content-Type', 'application/json')

    const raw = JSON.stringify({
      profile: {
        role: 'user',
        content: `User profile and connected wallet address ${JSON.stringify(auth.profile)}`,
      },
      old_messages: conversation,
      messages: {
        role: 'user',
        content: `${q}`,
      },
    })

    const requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow',
    }

    // Call OpenAI
    setIsLoading(true)

    fetch('/api/openai', requestOptions)
      .then((response) => response.json())
      .then((result) => {
        console.log(result)

        let newData = data.list
        newData.push({ type: `a`, content: result.output.content })
        setData({ list: newData })

        let newConversationData = conversation
        newConversationData.push(result.output)
        setConversation(newConversationData)
        // console.log(conversation)
        setIsLoading(false)

        window.setTimeout(() => {
          document.querySelector(`output`).scrollTop = document.querySelector(`output`).scrollHeight
        }, 500)
      })
      .catch((error) => console.error(error))
  }

  const filter = async (e) => {
    let dataFilter = app.list
    let filtered = false
    let filteredData = []

    if (categoryRef.current.value !== `all`) {
      dataFilter = dataFilter.filter((item) => item.category_id.toString() === categoryRef.current.value.toString())
      console.log(dataFilter, categoryRef.current.value)
    }

    if (e.target.value !== '') {
      filteredData = dataFilter.filter((item) => item.name.toLowerCase().includes(e.target.value.toLowerCase()))
      if (filteredData.length > 0) {
        setApp({ list: filteredData })
        filtered = true
      }
    }

    if (!filtered) setApp(backupData)
    else setApp({ list: filteredData })
  }

  useEffect(() => {
    getCategory().then((res) => {
      console.log(res)
      setCategory({ list: res })
    })

    getNetwork().then((res) => {
      console.log(res)
      setNetwork({ list: res })
    })

    getApp().then((res) => {
      console.log(res)
      setApp({ list: res })
      setBackupData({ list: res })
    })
  }, [])
  return (
    <div className={`${styles.page} d-flex flex-column`}>
      <header className={`${styles.header}`}>
        <div className={`__container d-f-c flex-column`} data-width={`small`}>
          <a href="https://vite.dev" target="_blank">
            <img src={AppLenzLogo} className="logo" alt="Vite logo" />
          </a>
          <h2>{import.meta.env.VITE_NAME}</h2>
          <small>{import.meta.env.VITE_SLOGAN}</small>
        </div>
      </header>

      <main className={`${styles.main} mt-40`}>
        <div className={`__container`} data-width={`medium`}>
          <div className={`${styles.form}`}>
            <form method="POST" onSubmit={(e) => sendMessage(e)}>
              <input ref={qRef} type={`text`} placeholder={`Search among ${app.list.length} apps`} onChange={(e) => filter(e)} />
            </form>

            <div className={`${styles.filter} d-flex grid--gap-050`}>
              <select ref={categoryRef} name={`category`}>
                <optgroup label={`Category`}>
                  <option value={`all`}>Select category</option>
                  {category.list.length > 0 &&
                    category.list.map((item, i) => (
                      <option key={i} value={item.id}>
                        {item.name}
                      </option>
                    ))}
                </optgroup>
              </select>

              <select ref={networkRef} name={`network`}>
                <optgroup label={`Networks`}>
                  {network.list.length > 0 &&
                    network.list.map((item, i) => (
                      <option key={i} value={item.name}>
                        {item.name} ({item.type})
                      </option>
                    ))}
                </optgroup>
              </select>
            </div>
          </div>

          <div className={`${styles.list} grid grid--fill grid--gap-1 mt-40`} style={{ '--data-width': `480px` }}>
            {app.list.length > 0 &&
              app.list.map((item, i) => {
                return (
                  <div key={i} className={`${styles.list__item}`}>
                    <div className={`${styles.list__item__body} d-flex align-items-center justify-content-between grid--gap-1`}>
                      <figure className={`d-f-c `}>
                        <img alt={item.name} src={item.logo} />
                      </figure>

                      <ul className={`d-flex flex-column align-items-between justify-content-around h-100 flex-1`}>
                        <li className={`d-flex align-items-center grid--gap-025`}>
                          <h3>
                            <b>{item.name}</b>
                          </h3>
                          <svg width="17" height="17" viewBox="0 0 17 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <g clipPath="url(#clip0_8245_7842)">
                              <path
                                d="M6.4612 15.4302L5.19453 13.2968L2.79453 12.7635L3.02786 10.2968L1.39453 8.43018L3.02786 6.56351L2.79453 4.09684L5.19453 3.56351L6.4612 1.43018L8.72786 2.39684L10.9945 1.43018L12.2612 3.56351L14.6612 4.09684L14.4279 6.56351L16.0612 8.43018L14.4279 10.2968L14.6612 12.7635L12.2612 13.2968L10.9945 15.4302L8.72786 14.4635L6.4612 15.4302ZM8.02786 10.7968L11.7945 7.03018L10.8612 6.06351L8.02786 8.89684L6.59453 7.49684L5.6612 8.43018L8.02786 10.7968Z"
                                fill="#1D9BF0"
                              />
                            </g>
                            <defs>
                              <clipPath id="clip0_8245_7842">
                                <rect width="16" height="16" fill="white" transform="translate(0.728516 0.430176)" />
                              </clipPath>
                            </defs>
                          </svg>
                        </li>
                        <li className={`w-100`}>
                          <p>{item.description.substring(1, 50)}</p>
                        </li>
                      </ul>

                      <div className={`d-flex grid--gap-025`}>
                        <button disabled>View</button>
                        <a target={`_blank`} href={`${item.url}`} className={`d-flex align-items-center grid--gap-025`}>
                          Open
                          <img src={IconOpenNewTap} />
                        </a>
                      </div>
                    </div>
                  </div>
                )
              })}
          </div>

          <div className={`d-f-c`}>
            <a href="./applenz-privacy-policy.html" target="_blank">
              <small>Privacy Policy</small>
            </a>
          </div>
        </div>
      </main>

      <footer className={`${styles.footer}`}>
        <a href={`https://aratta.dev`} target={`_blank`} className={`d-flex flex-row align-items-center grid--gap-050`}>
          <figure className={`d-f-c`}>
            <img alt={`${import.meta.env.VITE_AUTHOR}`} src={ArattaLabsLogo} />
          </figure>
          <small>{import.meta.env.VITE_AUTHOR}</small>
        </a>
      </footer>
    </div>
  )
}

export default Home
