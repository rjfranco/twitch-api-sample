export default function(element, element_to_insert) {
  element.parentNode.insertBefore(element_to_insert, element.nextSibling);
}
