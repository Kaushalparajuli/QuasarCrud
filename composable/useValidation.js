export default function useValidation (){
  const isRequired = (val) =>{
    return !!val || ''
  }
  return {
    isRequired
  }
}
