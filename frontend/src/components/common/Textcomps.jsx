export default function Textcomps({content, size}){
  return <div className={`text-gray-100 ${size ? size: 'text-1xl'} font-medium  hover:text-white transition-colors `}>{content}</div>
}