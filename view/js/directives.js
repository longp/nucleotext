angular.module('nucleotext')
  .directive('textQuery', function() {
    return {
      restrict: 'EA',
      templateUrl: 'template/textQuery.html',
      link: function($scope, elem, attrs) {
        $scope.showNucleotext = function() {
          $scope.showNucleotextString = true;
          if ($scope.alg === 'binary') {
            $scope.convertToBinary();
          } else {
            $scope.convertToBaseFour();
          }
        }
      }
    }
  })

  .directive('genBinary', function() {
    return {
      restrict: 'EA',
      templateUrl: 'template/binaryTemplate.html',
      link: function($scope, elem, attrs) {
        $scope.convertToBinary = function() {
          $scope.baseFourString = false; //if baseFourString is showing on page, hide it
          $scope.binaryText = [];
          for (var i = 0; i < $scope.nucleotext.length; i++) {
            $scope.binaryText.push($scope.nucleotext[i].charCodeAt(0).toString(2))
          }
          $scope.binaryString = $scope.binaryText.join('')
          $scope.generateNucleotideSequenceBinary();
        }
      }
    }
  })
  .directive('genBaseFour', function() {
    return {
      restrict: 'EA',
      templateUrl: 'template/baseFour.html',
      link: function($scope, elem, attrs) {
        $scope.convertToBaseFour = function() {
          $scope.binaryString = false; //if binaryString is showing on page hide it
          $scope.baseFourText = [];
          for (var i = 0; i < $scope.nucleotext.length; i++) {
            $scope.baseFourText.push($scope.nucleotext[i].charCodeAt(0).toString(4))
          }
          $scope.baseFourString = $scope.baseFourText.join('')
          $scope.generateNucleotideSequenceBaseFour();
        }
      }
    }
  })
  .directive('genNucStringBinary', function() {
    return {
      restrict: 'EA',
      templateUrl: 'template/nucTemplate.html',
      link: function($scope, elem, attrs) {
        $scope.generateNucleotideSequenceBinary = function() {
          $scope.nucleotideStringBaseFour = false; //if nucleotideStringBaseFour is showing on page hide it
          $scope.at = ['A','T']
          $scope.gc = ['G','C']
          $scope.nucleotides = []
          for (var i = 0; i < $scope.binaryString.length; i++) {
            var randomIndex = Math.floor(Math.random() * 2)
            if ($scope.binaryString[i] === '0') {
              $scope.nucleotides.push($scope.at[randomIndex])
            } else {
              $scope.nucleotides.push($scope.gc[randomIndex])
            }
          }
          $scope.nucleotideString = $scope.nucleotides.join('')
          $scope.calcSequences();
        }
        $scope.calcSequences = function() {
          var possibilities = Math.pow(2, $scope.nucleotides.length)
          $scope.possibilitiesFixed = Number(possibilities).toFixed(0)
        }
      }
    }
  })
  .directive('genNucStringBaseFour', function() {
    return {
      restrict: 'EA',
      templateUrl: 'template/nucTemplateBaseFour.html',
      link: function($scope, elem, attrs) {
        $scope.generateNucleotideSequenceBaseFour = function() {
          $scope.nucleotideString = false; //if nucleotideString binary is showing on page hide it
          $scope.nucleotideBaseFour = [];
          for (var i = 0; i < $scope.baseFourString.length; i++) {
            switch ($scope.baseFourString[i]) {
              case '0':
                $scope.nucleotideBaseFour.push('A')
                break;
              case '1':
                $scope.nucleotideBaseFour.push('T')
                break;
              case '2':
                $scope.nucleotideBaseFour.push('G')
                break;
              case '3':
                $scope.nucleotideBaseFour.push('C')
                break;
            }
          }
          $scope.nucleotideStringBaseFour = $scope.nucleotideBaseFour.join('')
        }
      }
    }
  })