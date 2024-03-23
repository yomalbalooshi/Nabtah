import { Button } from 'primereact/button'

const Landing = () => {
  return (
    <div>
      <h2>hello</h2>
      <h3>
        first page the customer lands on with our logo and login/logout links -
        maybe we dont need this
      </h3>
      <div className="flex content-center justify-center">
        <Button label="Check" icon="pi pi-check" />
      </div>
    </div>
  )
}

export default Landing
