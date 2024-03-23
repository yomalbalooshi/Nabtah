import { Button } from 'primereact/button'

const Landing = () => {
  return (
    <div>
      <h2>hello</h2>
      <h3>
        first page the customer lands on with our logo and login/logout links -
        maybe we dont need this
      </h3>
      <div className=" flex justify-center">
        <Button
          label="Submit"
          // pt={{
          //   root: { className: 'bg-teal-900' }
          // }}
        />
      </div>
    </div>
  )
}

export default Landing
